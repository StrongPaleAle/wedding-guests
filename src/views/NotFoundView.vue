<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { messages } from '@/locales/404/index'
const { t } = useI18n({ messages: messages })
</script>
<template>
    <div class="text-center">
        <h1 class="text-7xl font-serif mb-6">
            404 <span class="block text-4xl">{{ t('notfoundTitle') }}</span>
        </h1>
        <p class="mb-4 max-w-prose text-lg">{{ t('notfoundMessage') }}</p>
        <RouterLink class="btn" to="/">{{ t('backHome') }}</RouterLink>
    </div>
</template>
