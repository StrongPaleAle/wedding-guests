import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'
import type { SupabaseGuestType, SupabaseRestriction } from '@/utils/types'

export const guestsMetaStore = defineStore({
    id: 'guestsMeta',
    state: () => ({
        guestTypes: [] as SupabaseGuestType[],
        restrictions: [] as SupabaseRestriction[]
    }),
    actions: {
        async getGuestTypes() {
            const { data, error } = await supabase.from('guest_type').select()

            if (error) {
                throw error
            }
            console.log(data)
            this.guestTypes = data
        },
        async getRestrictions() {
            const { data, error } = await supabase.from('food_restrictions').select()

            if (error) {
                throw error
            }
            console.log(data)
            this.restrictions = data
        },
        async createGuestType(guestType: SupabaseGuestType) {
            const { data, error } = await supabase.from('guest_type').insert(guestType)

            if (error) {
                throw error
            }

            return data
        },
        async createRestriction(restriction: SupabaseRestriction) {
            const { data, error } = await supabase.from('food_restrictions').insert(restriction)

            if (error) {
                throw error
            }

            return data
        },
        getGuestsMeta() {
            this.getGuestTypes()
            this.getRestrictions()
        }
    }
})
