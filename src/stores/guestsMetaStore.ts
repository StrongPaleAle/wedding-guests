import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'
import type { SupabaseGuestType, SupabaseRestriction } from '@/utils/types'

export const guestsMetaStore = defineStore({
    id: 'guestsMeta',
    state: () => ({
        guestTypes: [] as SupabaseGuestType[],
        restrictions: [] as SupabaseRestriction[]
    }),
    getters: {
        guestTypeByID: (state) => (id: number) => {
            return state.guestTypes.find((guestType) => guestType.id === id)
        },
        restrictionByID: (state) => (id: number) => {
            return state.restrictions.find((restriction) => restriction.id === id)
        },
        restrictionsByID: (state) => (ids: number[]) => {
            return state.restrictions.filter((restriction) => ids.includes(restriction.id))
        }
    },
    actions: {
        async getGuestTypes() {
            const { data, error } = await supabase.from('guest_type').select('id, name, label')

            if (error) {
                throw error
            }
            console.log(data)
            this.guestTypes = data
        },
        async getRestrictions() {
            const { data, error } = await supabase
                .from('food_restrictions')
                .select('id, name, label, public')

            if (error) {
                throw error
            }
            // console.log(data)
            this.restrictions = data
        },
        async createRestriction(restriction: string) {
            const regex = /[^a-zA-Z0-9]/g
            const restrictionObj = {
                name: restriction.toLowerCase().replace(regex, '_'),
                label: { en: restriction, it: restriction },
                public: false
            }
            const { data, error } = await supabase
                .from('food_restrictions')
                .insert(restrictionObj)
                .select('id, name, label, public')

            if (error) {
                throw error
            }

            this.restrictions.push(data[0])
        },
        getGuestsMeta() {
            this.getGuestTypes()
            this.getRestrictions()
        }
    }
})
