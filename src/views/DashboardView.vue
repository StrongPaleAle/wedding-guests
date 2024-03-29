<script setup lang="ts">
import { userSessionStore } from '@/stores/userSessionStore'

const userSession = userSessionStore()
</script>
<template>
    <div>
        <h1>{{ userSession.user.email }}</h1>
    </div>
</template>
