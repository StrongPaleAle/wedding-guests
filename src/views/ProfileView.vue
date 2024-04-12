<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { userSessionStore } from '@/stores/userSessionStore'
import { userGuestStore } from '@/stores/userGuestStore'
import { guestsMetaStore } from '@/stores/guestsMetaStore'
import AppAddGuest from '@/components/AppAddGuest.vue'

const userSession = userSessionStore()
const userGuest = userGuestStore()
const guestsMeta = guestsMetaStore()
const { t } = useI18n()
const username = ref(userSession.userProfile?.username || userSession.user?.email || '')
guestsMeta.getRestrictions()
guestsMeta.getGuestTypes()
</script>
<template>
    <div>
        <h1>{{ t('welcome') }} {{ username }}</h1>
        <!-- <input class="form-input" type="text" v-model="username" />
        <button class="btn" @click="userSession.updateUsername(username)">Update</button> -->
        <AppAddGuest />
    </div>
</template>
