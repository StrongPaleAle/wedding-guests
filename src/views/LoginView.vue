<script setup lang="ts">
import { onMounted } from 'vue'
import { userSessionStore } from '@/stores/userSessionStore'
import AppSignForm from '@/components/AppSignForm.vue'
import { useRouter, useRoute } from 'vue-router'
import { useAlerts } from '@/stores/alertsStore'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const userSession = userSessionStore()
const router = useRouter()
const route = useRoute()
const alerts = useAlerts()
const login = async (email: string, password: string) => {
    try {
        await userSession.signIn(email, password)
        router.push({ name: 'Profile' })
    } catch (error: any) {
        alerts.error(error.message)
    }
}
onMounted(() => {
    if (userSession.user) {
        router.push({ name: 'Profile' })
    }
    if (route.params.message) {
        alerts.error(t(route.params.alert as string))
    }
})
</script>
<template>
    <div>
        <h1 class="text-2xl mb-8 font-serif">Login</h1>

        <AppSignForm id="login" action="Login" @submit="login($event.email, $event.password)" />
    </div>
</template>
