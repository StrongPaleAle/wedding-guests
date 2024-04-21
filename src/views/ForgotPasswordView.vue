<script setup>
import { userSessionStore } from '@/stores/userSessionStore'
import { ref } from 'vue'
import { useAlerts } from '@/stores/alertsStore'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const alerts = useAlerts()
// use necessary composables
const userSession = userSessionStore()

// keep up with email
const email = ref('')

// function to call on submit of the form
// triggers sending the reset email to the user
const handlePasswordReset = async () => {
    await userSession.sendPasswordReset(email.value)
    alerts.success(t('resetPasswordEmailSent'))
}
</script>
<template>
    <div class="min-w-80 sm:min-w-96 card p-4 md:p-8">
        <h1 class="text-3xl mb-6 font-serif">Forgot Password?</h1>
        <form class="grid grid-cols-1 gap-6" @submit.prevent="handlePasswordReset()">
            <label
                ><span class="block">Email </span
                ><input class="form-input" v-model="email" type="email"
            /></label>

            <button class="btn">Send Reset Email</button>
        </form>
    </div>
</template>
