<script setup lang="ts">
import { ref } from 'vue'
import { userSessionStore } from '@/stores/userSessionStore'

const form = ref({
    email: '',
    password: ''
})
const userSession = userSessionStore()

const register = async () => {
    try {
        await userSession.signUp(form.value.email, form.value.password)
        console.log('User registered')
    } catch (error) {
        console.error(error)
        console.log('User not registered' + error.message)
    }
}
</script>
<template>
    <div>
        <h1 class="text-2xl mb-8 font-serif">Register</h1>

        <form class="grid grid-cols-1 gap-6" @submit.prevent="register">
            <input v-model="form.email" id="register-email" type="email" placeholder="Email" />
            <input
                v-model="form.password"
                id="register-password"
                type="password"
                placeholder="Password"
            />
            <button class="btn">Register</button>
        </form>
    </div>
</template>
