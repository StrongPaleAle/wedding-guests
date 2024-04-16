import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'
import { userSessionStore } from '@/stores/userSessionStore'
import { guestsMetaStore } from './guestsMetaStore'
import type {
    StoreGuest,
    GuestData,
    GuestBase,
    SupabaseGuest,
    SupabaseGuestType,
    SupabaseRestriction
} from '@/utils/types'

export const userGuestStore = defineStore({
    id: 'userGuest',
    state: () => ({
        supabaseGuests: [] as SupabaseGuest[],
        guests: [] as StoreGuest[],
        loadingGuests: true
    }),
    actions: {
        async getUserGuests() {
            const userSession = userSessionStore()
            if (!userSession.user) {
                return
            }
            const { data, error } = await supabase
                .from('guests')
                .select('id, name, user_id, guest_type, attendance')
                .eq('user_id', userSession.user.id)

            if (error) {
                throw error
            }

            console.log(data)
            this.supabaseGuests = data as SupabaseGuest[]
            await this.setStoreGuests(data as SupabaseGuest[])
            this.loadingGuests = false
        },
        async getGuestByID(id: number) {
            const { data, error } = await supabase
                .from('guests')
                .select('id, name, user_id, guest_type, attendance')
                .eq('id', id)

            if (error) {
                throw error
            }

            return data[0]
        },
        async getGuestRestrictions(id: number) {
            const { data, error } = await supabase
                .from('guest_restriction')
                .select('restriction_id')
                .eq('guest_id', id)

            if (error) {
                throw error
            }

            return data
        },
        async setStoreGuest(
            guest: SupabaseGuest,
            restrictionIds?: number[],
            hasRestrictions = true
        ) {
            const guestData = {
                ...guest,
                restriction_ids: restrictionIds || ([] as number[]),
                guest_type_obj: {} as SupabaseGuestType,
                restrictions: [] as SupabaseRestriction[]
            }
            if (!restrictionIds && hasRestrictions) {
                const guestRestrictions = await this.getGuestRestrictions(guest.id)

                if (guestRestrictions) {
                    const restriction_ids = guestRestrictions.map(
                        (restriction) => restriction.restriction_id
                    )
                    guestData.restriction_ids = restriction_ids
                }
            }

            if (guestData.restriction_ids.length > 0) {
                const restrictions = guestsMetaStore().restrictionsByID(guestData.restriction_ids)
                guestData.restrictions = restrictions
            }

            const guestType = guestsMetaStore().guestTypeByID(guest.guest_type)

            if (guestType) {
                guestData.guest_type_obj = guestType
            }
            const existingGuest = this.guests.find((g) => g.id === guest.id)
            if (existingGuest) {
                Object.assign(existingGuest, guestData)
            } else {
                this.guests.push(guestData)
            }
        },
        async setStoreGuests(guests: SupabaseGuest[]) {
            const guestsIds = guests.map((guest) => guest.id)
            if (guestsIds.length) {
                const { data, error } = await supabase
                    .from('guest_restriction')
                    .select()
                    .in('guest_id', guestsIds)
                if (error) {
                    throw error
                }
                for (const guest of guests) {
                    const restrictionIds = data
                        .filter((restriction) => restriction.guest_id === guest.id)
                        .map((restriction) => restriction.restriction_id)

                    const hasRestrictions = restrictionIds.length > 0

                    await this.setStoreGuest(guest, restrictionIds, hasRestrictions)
                }
            }
        },
        async createGuest(guest: GuestData) {
            const guestData: GuestBase = {
                name: guest.name,
                user_id: guest.user_id,
                guest_type: guest.guest_type,
                attendance: guest.attendance
            }
            const { data: guestRes, error } = await supabase
                .from('guests')
                .insert(guestData)
                .select('id, name, user_id, guest_type, attendance')

            if (error) {
                throw error
            }
            if (guestRes && guest.restriction_ids.length) {
                const guest_id = guestRes[0].id
                for (const restriction_id of guest.restriction_ids) {
                    await this.createGuestRestriction(guest_id, restriction_id)
                }
            }
            this.setStoreGuest(guestRes[0], guest.restriction_ids)
        },
        async updateGuest(guest: GuestData, guestId: number) {
            const guestData: GuestBase = {
                name: guest.name,
                user_id: guest.user_id,
                guest_type: guest.guest_type,
                attendance: guest.attendance
            }
            const { data: guestRes, error } = await supabase
                .from('guests')
                .update(guestData)
                .eq('id', guestId)
                .select('id, name, user_id, guest_type, attendance')

            if (error) {
                throw error
            }
            const guest_id = guestRes[0].id
            const storeGuest = this.guests.find((g) => g.id === guestId)
            const storeGuestRestrictions = storeGuest?.restriction_ids || []
            const restrictionsAdded = guest.restriction_ids.filter(
                (id) => !storeGuestRestrictions.includes(id)
            )
            const restrictionsRemoved = storeGuestRestrictions.filter(
                (id) => !guest.restriction_ids.includes(id)
            )
            if (restrictionsAdded.length) {
                for (const restriction_id of restrictionsAdded) {
                    await this.createGuestRestriction(guest_id, restriction_id)
                }
            }

            if (restrictionsRemoved.length) {
                for (const restriction_id of restrictionsRemoved) {
                    await this.deleteGuestRestriction(guest_id, restriction_id)
                }
            }
            this.setStoreGuest(guestRes[0], guest.restriction_ids)
        },
        async deleteGuest(id: number) {
            const { error } = await supabase.from('guests').delete().eq('id', id)

            if (error) {
                throw error
            }

            this.guests = this.guests.filter((guest) => guest.id !== id)
            this.supabaseGuests = this.supabaseGuests.filter((guest) => guest.id !== id)
        },
        async createGuestRestriction(guest_id: number, restriction_id: number) {
            const { data, error } = await supabase
                .from('guest_restriction')
                .insert({ guest_id, restriction_id })
                .select()

            if (error) {
                throw error
            }

            return data
        },
        async deleteGuestRestriction(guest_id: number, restriction_id: number) {
            const { error } = await supabase
                .from('guest_restriction')
                .delete()
                .eq('guest_id', guest_id)
                .eq('restriction_id', restriction_id)

            if (error) {
                throw error
            }
        }
    }
})
