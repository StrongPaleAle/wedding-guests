<script setup lang="ts">
import { RouterView } from 'vue-router'
import { userSessionStore } from '@/stores/userSessionStore'
import { userGuestStore } from '@/stores/userGuestStore'
import AppAlerts from '@/components/AppAlerts.vue'
import TheNav from '@/components/TheNav.vue'

const userSession = userSessionStore()
const userGuest = userGuestStore()
userSession.sessionInit()
</script>

<template>
    <TheNav />
    <div class="flex justify-center items-center min-h-svh p-4 md:p-10 pb-20 md:pt-28">
        <RouterView />
    </div>
    <AppAlerts />
</template>
