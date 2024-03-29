import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'
import type { User, Session } from '@supabase/supabase-js'
import type { Profile } from '@/utils/types/profile'

export const userSessionStore = defineStore({
    id: 'userSession',
    state: () => ({
        user: null as User | null,
        session: null as Session | null,
        userProfile: null as Profile | null,
        loadingUser: true
    }),
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
        async signUp(email: string, password: string) {
            const { data, error } = await supabase.auth.signUp({
                email,
                password
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
                alert(error.message)
            }
        },
        async updateUsername(username: string) {
            if (!this.user) {
                return
            }
            try {
                const user = this.user

                const { data, error } = await supabase
                    .from('profiles')
                    .update({
                        username: username
                    })
                    .eq('id', user.id)

                if (error) throw error
                if (data) {
                    console.log(data)
                }
            } catch (error: any) {
                alert(error.message)
            }
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
                console.log(event, session)
                if (session && event === 'SIGNED_IN') {
                    this.setUser(session)
                }
            })
        },
        async canAccess(to: any) {
            const userLevel = await this.authLevel
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
