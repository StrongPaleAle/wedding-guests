<script setup lang="ts">
import { userSessionStore } from '@/stores/userSessionStore'
import { useAlerts } from '@/stores/alertsStore'
import AppRegisterForm from '@/components/AppRegisterForm.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const alerts = useAlerts()
const { t } = useI18n()

const userSession = userSessionStore()

const register = async (email: string, password: string, username: string) => {
    try {
        await userSession.signUp(email, password, username)
        router.push({ name: 'email-confirmation', query: { email } })
    } catch (error: any) {
        console.error(error)
        alerts.error(error.message)
    }
}
</script>
<template>
    <div class="min-w-80 sm:min-w-96 card p-4 md:p-8">
        <h1 class="text-2xl mb-6 font-serif">{{ t('signUp') }}</h1>

        <AppRegisterForm
            id="register"
            :action="t('signUp')"
            @submit="register($event.email, $event.password, $event.username)"
        />
    </div>
</template>
