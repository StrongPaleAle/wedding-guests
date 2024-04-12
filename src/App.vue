<script setup lang="ts">
import { RouterView } from 'vue-router'
import { userSessionStore } from '@/stores/userSessionStore'
import { userGuestStore } from '@/stores/userGuestStore'
import AppAlerts from '@/components/AppAlerts.vue'

const userSession = userSessionStore()
const userGuest = userGuestStore()
userGuest.getGuests()
userSession.sessionInit()
</script>

<template>
    <div class="flex justify-center items-center min-h-svh p-10">
        <RouterView />
    </div>
    <AppAlerts />
</template>
