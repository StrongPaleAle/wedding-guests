<script setup lang="ts">
import { onMounted } from 'vue'
import { userSessionStore } from '@/stores/userSessionStore'
import AppSignForm from '@/components/AppSignForm.vue'
import { useRouter } from 'vue-router'
import { useAlerts } from '@/stores/alertsStore'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const userSession = userSessionStore()
const router = useRouter()

const alerts = useAlerts()
const login = async (email: string, password: string) => {
    try {
        await userSession.signIn(email, password)
        router.push({ name: 'profile' })
    } catch (error: any) {
        alerts.error(error.message)
    }
}
onMounted(() => {
    if (userSession.user) {
        router.push({ name: 'profile' })
    }
})
</script>
<template>
    <div>
        <h1 class="text-2xl mb-8 font-serif">{{ t('signIn') }}</h1>

        <AppSignForm
            id="login"
            :action="t('signIn')"
            @submit="login($event.email, $event.password)"
        />
        <RouterLink to="/forgot-password" class="hover:underline">
            {{ t('forgotPassword') }}
        </RouterLink>
    </div>
</template>
