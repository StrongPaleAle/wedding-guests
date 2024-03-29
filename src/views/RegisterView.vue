<script setup lang="ts">
import { userSessionStore } from '@/stores/userSessionStore'
import AppSignForm from '@/components/AppSignForm.vue'

const userSession = userSessionStore()

const register = async (email: string, password: string) => {
    try {
        await userSession.signUp(email, password)
        console.log('User registered')
    } catch (error: any) {
        console.error(error)
        console.log('User not registered' + error.message)
    }
}
</script>
<template>
    <div>
        <h1 class="text-2xl mb-8 font-serif">Register</h1>

        <AppSignForm
            id="register"
            action="Register"
            @submit="register($event.email, $event.password)"
        />
    </div>
</template>
