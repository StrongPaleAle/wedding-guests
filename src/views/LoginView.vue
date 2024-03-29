<script setup lang="ts">
import { userSessionStore } from '@/stores/userSessionStore'
import AppSignForm from '@/components/AppSignForm.vue'

const userSession = userSessionStore()

const login = async (email: string, password: string) => {
    try {
        await userSession.signIn(email, password)
    } catch (error: any) {
        console.error(error)
    }
}
</script>
<template>
    <div>
        <h1 class="text-2xl mb-8 font-serif">Login</h1>

        <AppSignForm id="login" action="Login" @submit="login($event.email, $event.password)" />
    </div>
</template>
