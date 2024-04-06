<script setup lang="ts">
import { userSessionStore } from '@/stores/userSessionStore'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const userSession = userSessionStore()
</script>

<template>
    <div>
        <div v-if="userSession.user">
            <RouterLink class="btn" to="/profile"> Profile </RouterLink>
            <button class="btn" @click="userSession.signOut">{{ t('signOut') }}</button>
        </div>
        <div v-else>
            <RouterLink class="btn" to="/register">{{ t('signUp') }}</RouterLink>
            <RouterLink class="btn" to="/login">{{ t('signIn') }}</RouterLink>
        </div>
    </div>
</template>
