<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { userSessionStore } from '@/stores/userSessionStore'

const userSession = userSessionStore()
const { t } = useI18n()
const username = ref(userSession.userProfile?.username || userSession.user?.email || '')
</script>
<template>
    <div>
        <h1>{{ t('welcome') }} {{ username }}</h1>
        <!-- <input class="form-input" type="text" v-model="username" />
        <button class="btn" @click="userSession.updateUsername(username)">Update</button> -->
    </div>
</template>
