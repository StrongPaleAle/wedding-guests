<script setup>
import { userSessionStore } from '@/stores/userSessionStore'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

// use necessary composables
const userSession = userSessionStore()

// keep up with email
const password = ref('')

// function to call on submit of the form
// triggers sending the reset email to the user
const handlePasswordReset = async () => {
    await userSession.resetPassword(password.value)
    router.push({ name: 'profile', params: { alert: 'noPermission', 'alert-type': 'error' } })
}
</script>
<template>
    <div>
        <h1 class="text-3xl mb-5">Insert your new password</h1>
        <form class="max-w-lg m-auto" @submit.prevent="handlePasswordReset()">
            <label
                ><span class="block">Password</span>
                <input class="form-input" v-model="password" type="password"
            /></label>
            <button class="btn">Reset Password</button>
        </form>
    </div>
</template>
