import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'
import type { User, Session } from '@supabase/supabase-js'
import type { Profile } from '@/utils/types'
import { useAlerts } from '@/stores/alertsStore'
import { useRouter } from 'vue-router'

export const userSessionStore = defineStore({
    id: 'userSession',
    state: () => ({
        user: null as User | null,
        session: null as Session | null,
        userProfile: null as Profile | null,
        loadingUser: true
    }),
    persist: true,
    getters: {
        authLevel(): number | null {
            return this.userProfile?.user_group || null
        }
    },
    actions: {
        async signIn(email: string, password: string) {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (error) {
                throw error
            }

            this.user = data.user
            this.session = data.session
        },
        async signOut() {
            const { error } = await supabase.auth.signOut()

            if (error) {
                throw error
            }
            this.user = null
            this.session = null
            this.userProfile = null
        },
        async signUp(email: string, password: string, username: string) {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { username } }
            })

            if (error) {
                throw error
            }
            return data
        },
        async getProfile() {
            if (!this.user) {
                return
            }
            const alerts = useAlerts()
            try {
                const user = this.user

                const { data, error, status } = await supabase
                    .from('profiles')
                    .select(`username, user_group`)
                    .eq('id', user.id)
                    .single()

                if (error && status !== 406) throw error
                if (data) {
                    this.userProfile = data
                }
            } catch (error: any) {
                alerts.error(error.message)
            }
        },
        async updateUsername(username: string) {
            if (!this.user) {
                return
            }
            const alerts = useAlerts()
            try {
                const user = this.user

                const { data, error } = await supabase
                    .from('profiles')
                    .update({
                        username: username
                    })
                    .eq('id', user.id)

                if (error) throw error
            } catch (error: any) {
                alerts.error(error.message)
            }
        },
        async sendPasswordReset(email: string) {
            const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/update-password`
            })
            if (error) throw error
        },
        async resetPassword(new_password: string) {
            const { data, error } = await supabase.auth.updateUser({
                password: new_password
            })
            if (error) throw error
        },
        setUser(session: Session) {
            this.session = session
            this.user = session.user
            this.getProfile()
        },
        sessionInit() {
            supabase.auth.getSession().then(({ data, error }) => {
                if (error) {
                    throw error
                }
                if (data.session) {
                    this.setUser(data.session)
                }
                this.loadingUser = false
            })
            supabase.auth.onAuthStateChange((event, session) => {
                //console.log(event, session)
                if (session && event === 'SIGNED_IN') {
                    this.setUser(session)
                }
            })
        },
        async canAccess(to: any) {
            if (!this.user) {
                return false
            }
            const { data } = await supabase
                .from('profiles')
                .select(`user_group`)
                .eq('id', this.user?.id)
                .single()
            const userLevel = data?.user_group
            const needsAuth = to.meta.needsAuth
            console.log('userLevel: ', userLevel)
            console.log('needsAuth: ', needsAuth)
            const canAccess =
                typeof needsAuth === 'number' &&
                typeof userLevel === 'number' &&
                needsAuth <= userLevel
            return canAccess
        }
    }
})
