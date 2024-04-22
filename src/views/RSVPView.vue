<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { userSessionStore } from '@/stores/userSessionStore'
import { userGuestStore } from '@/stores/userGuestStore'
import { guestsMetaStore } from '@/stores/guestsMetaStore'
import { useAlerts } from '@/stores/alertsStore'
import type { StoreGuest, GuestForm, GuestData } from '@/utils/types'
import AppAddGuest from '@/components/AppAddGuest.vue'
import { profileMessages } from '@/locales/profile/index'
import AppDialog from '@/components/AppDialog.vue'

import GuestsList from '@/components/Guests/GuestsList.vue'

const { t } = useI18n({ messages: profileMessages })
const alerts = useAlerts()

const userSession = userSessionStore()
const userGuest = userGuestStore()
const guestsMeta = guestsMetaStore()

guestsMeta.getRestrictions()
guestsMeta.getGuestTypes()
userGuest.getUserGuests()
const showConfirm = ref(false)
const showForm = ref(false)
const modalGuest = ref<StoreGuest | null>(null)

async function handleGuestForm(form: GuestForm) {
    const guest: GuestData = {
        ...form.guest,
        user_id: form.guest.user_id || userSession.user?.id || ''
    }
    if (form.guest_id) {
        try {
            await userGuest.updateGuest(guest, form.guest_id)
            showForm.value = false
            modalGuest.value = null
            alerts.success(t('guestUpdateSuccess'))
        } catch (error: any) {
            console.error(error)
            alerts.error(error)
        }
    } else {
        try {
            await userGuest.createGuest(guest)
            showForm.value = false
            modalGuest.value = null
            alerts.success(t('guestAddSuccess'))
        } catch (error: any) {
            console.error(error)
            alerts.error(error)
        }
    }
}
async function addRestriction(restriction: string) {
    try {
        await guestsMeta.createRestriction(restriction)
        alerts.success(t('restrictionAdded'))
    } catch (error: any) {
        console.error(error)
        alerts.error(error)
    }
}
async function deleteGuest(id: number | undefined | null) {
    if (id === null || id === undefined) {
        throw new Error('Guest ID is null')
    }
    try {
        await userGuest.deleteGuest(id)
        alerts.success(t('guestDeleteSuccess'))
        showConfirm.value = false
    } catch (error: any) {
        console.error(error)
        alerts.error(error)
    }
}
function deleteDialog(guest: StoreGuest) {
    modalGuest.value = guest
    showConfirm.value = true
}
function editDialog(guest: StoreGuest) {
    modalGuest.value = guest

    showForm.value = true
}
</script>
<template>
    <div
        class="view-wrapper max-w-[90rem] mx-auto"
        v-show="!userGuest.loadingGuests && !userSession.loadingUser"
    >
        <h1 class="text-4xl font-serif mb-8">
            {{ t('welcome') }}
            <span class="text-copper-200">{{
                userSession.userProfile?.username || userSession.user?.email
            }}</span>
        </h1>
        <p class="mb-8 max-w-prose">{{ t('profileGreetings') }}</p>
        <!-- {{ userSession.session }}
        {{ userSession.user }} -->

        <GuestsList
            v-if="userGuest.guests.length > 0"
            :guests="userGuest.guests"
            @delete="deleteDialog($event)"
            @edit="editDialog($event)"
        />
        <!-- {{ userGuest.supabaseGuests }} -->
        <!-- <input class="form-input" type="text" v-model="username" />
        <button class="btn" @click="userSession.updateUsername(username)">Update</button> -->
        <div class="p-8 text-center">
            <button class="btn" @click="showForm = true">{{ t('addGuest') }}</button>
        </div>

        <Teleport to="#app">
            <AppDialog :show="showForm" @close="showForm = false">
                <AppAddGuest
                    @submit="handleGuestForm($event.form)"
                    @addRestriction="addRestriction($event)"
                    :guestTypes="guestsMeta.guestTypes"
                    :restrictions="guestsMeta.restrictions"
                    :guest="modalGuest"
                />
            </AppDialog>
            <AppDialog :show="showConfirm" @close="showConfirm = false">
                <div class="p-4" v-if="modalGuest && modalGuest.id">
                    <p class="text-lg mb-8 text-center">
                        {{ t('confirmDelete') }}
                        <span class="text-copper-200">{{ modalGuest.name }}</span>
                    </p>
                    <div class="flex gap-4">
                        <button
                            class="btn"
                            v-if="modalGuest.id"
                            @click="deleteGuest(modalGuest?.id)"
                        >
                            {{ t('delete') }}
                        </button>
                        <button class="btn btn--secondary" @click="showConfirm = false">
                            {{ t('cancel') }}
                        </button>
                    </div>
                </div>
            </AppDialog>
        </Teleport>
    </div>
</template>
<style lang="postcss">
.view-wrapper {
    @apply animate-fade-in;
}
</style>
