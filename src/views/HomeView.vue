<script setup lang="ts">
import { userSessionStore } from '@/stores/userSessionStore'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const userSession = userSessionStore()
</script>

<template>
    <div>
        <div>{{ userSession.userProfile }}</div>
        <div v-if="userSession.user">
            {{ t('welcome') }} {{ userSession.user.email }}
            <button class="btn" @click="userSession.signOut">Sign Out</button>
        </div>
        <div v-else>
            <RouterLink class="btn" to="/register"> Register </RouterLink>
            <RouterLink class="btn" to="/login"> Login </RouterLink>
        </div>
    </div>
</template>
