<script setup lang="ts">
import { ref } from 'vue'
import { userSessionStore } from '@/stores/userSessionStore'

const userSession = userSessionStore()

const username = ref(userSession.userProfile?.username || userSession.user?.email || '')
</script>
<template>
    <div>
        <h1>
            {{ userSession.userProfile?.username || userSession.user?.email }}
            {{ userSession.authLevel }}
        </h1>
        <input type="text" v-model="username" />
        <button class="btn" @click="userSession.updateUsername(username)">Update</button>
    </div>
</template>
