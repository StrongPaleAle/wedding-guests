import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'
import { userSessionStore } from '@/stores/userSessionStore'
import type { Guest, SupabaseGuest, SupabaseGuestType, SupabaseRestriction } from '@/utils/types'

export const userGuestStore = defineStore({
    id: 'userGuest',
    state: () => ({
        guests: [] as Guest[],
        loadingGuests: true
    }),
    getters: {
        guestTypes(): SupabaseGuestType[] {
            return this.guests.map((guest) => guest.guest_type)
        },
        guestRestrictions(): SupabaseRestriction[] {
            return this.guests.flatMap((guest) => guest.restrictions)
        }
    },
    actions: {
        async getGuests() {
            const userSession = userSessionStore()
            if (!userSession.user) {
                return
            }
            const { data, error } = await supabase
                .from('guests')
                .select('*')
                .eq('user_id', userSession.user.id)

            if (error) {
                throw error
            }

            console.log(data)
            this.loadingGuests = false
        },
        async getGuest(id: number) {
            const { data, error } = await supabase.from('guests').select('*').eq('id', id)

            if (error) {
                throw error
            }

            return data[0]
        },
        async createGuest(guest: SupabaseGuest) {
            const { data, error } = await supabase.from('guests').insert(guest)

            if (error) {
                throw error
            }

            return data
        },
        async updateGuest(guest: SupabaseGuest) {
            const { data, error } = await supabase.from('guests').update(guest).eq('id', guest.id)

            if (error) {
                throw error
            }

            return data
        },
        async deleteGuest(id: number) {
            const { error } = await supabase.from('guests').delete().eq('id', id)

            if (error) {
                throw error
            }
        }
    }
})
