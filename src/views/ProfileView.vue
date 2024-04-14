<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { userSessionStore } from '@/stores/userSessionStore'
import { userGuestStore } from '@/stores/userGuestStore'
import { guestsMetaStore } from '@/stores/guestsMetaStore'
import { useAlerts } from '@/stores/alertsStore'
import type { StoreGuest, GuestData } from '@/utils/types'
import AppAddGuest from '@/components/AppAddGuest.vue'
import GuestsTable from '@/components/GuestsTable.vue'
import { profileMessages } from '@/locales/profile/index'

const { t } = useI18n({ messages: profileMessages })
const alerts = useAlerts()

const userSession = userSessionStore()
const userGuest = userGuestStore()
const guestsMeta = guestsMetaStore()

const username = ref(userSession.userProfile?.username || userSession.user?.email || '')

guestsMeta.getRestrictions()
guestsMeta.getGuestTypes()
userGuest.getUserGuests()

async function addGuest(form: GuestData) {
    const guest: GuestData = {
        ...form,
        user_id: userSession.user?.id || ''
    }
    try {
        await userGuest.createGuest(guest)
        alerts.success(t('guestAddSuccess'))
    } catch (error: any) {
        console.error(error)
        alerts.error(error)
    }
}
async function addRestriction(restriction: string) {
    try {
        await guestsMeta.createRestriction(restriction)
        alerts.success(t('restrictionAddSuccess'))
    } catch (error: any) {
        console.error(error)
        alerts.error(error)
    }
}
</script>
<template>
    <div class="max-w-[90rem] mx-auto">
        <h1 class="text-5xl font-serif mb-8">{{ t('welcome') }} {{ username }}</h1>

        <!-- {{ userSession.session }}
        {{ userSession.user }} -->

        <GuestsTable :guests="userGuest.guests" />
        <!-- {{ userGuest.supabaseGuests }} -->
        <!-- <input class="form-input" type="text" v-model="username" />
        <button class="btn" @click="userSession.updateUsername(username)">Update</button> -->
        <AppAddGuest
            @submit="addGuest($event.form)"
            @addRestriction="addRestriction($event)"
            :guestTypes="guestsMeta.guestTypes"
            :restrictions="guestsMeta.restrictions"
        />
    </div>
</template>
