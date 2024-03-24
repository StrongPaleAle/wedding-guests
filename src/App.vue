<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { userSessionStore } from '@/stores/userSessionStore'

const userSession = userSessionStore()

onMounted(() => {
    userSession.restoreSession()

    console.log(userSession.user)
    console.log(userSession.session)
})
</script>

<template>
    <div class="flex justify-center p-10">
        <RouterView />
    </div>
</template>
