<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { homeMessages } from '../locales/home'

const { t } = useI18n({ messages: homeMessages })

defineProps<{
    title: string
    company: string
    companyLink: string
    description: string
    ingredients: string
    instructions: string
    imageUrl?: string
    imageAlt?: string
}>()
</script>
<template>
    <div class="card">
        <img v-if="imageUrl" :src="imageUrl" :alt="imageAlt" />
        <div class="card__content">
            <h2>{{ title }}</h2>
            <a :href="companyLink">{{ t('from') }}: {{ company }}</a>
            <p>{{ description }}</p>
            <p>{{ t('ingredients') }}: {{ ingredients }}</p>
            <p>{{ t('instructions') }}: {{ instructions }}</p>
        </div>
    </div>
</template>
