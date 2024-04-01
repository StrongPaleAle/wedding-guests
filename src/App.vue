<script setup lang="ts">
import { RouterView } from 'vue-router'
import { userSessionStore } from '@/stores/userSessionStore'
import AppAlerts from '@/components/AppAlerts.vue'

const userSession = userSessionStore()
userSession.sessionInit()
</script>

<template>
    <div class="flex justify-center items-center min-h-svh p-10">
        <RouterView />
    </div>
    <AppAlerts />
</template>
