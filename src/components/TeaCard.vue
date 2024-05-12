<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { homeMessages } from '../locales/home'

const { t } = useI18n({ messages: homeMessages })
interface TeaCardProps {
    title: string
    company: string
    companyLink: string
    description: string
    ingredients: string
    instructions: string
    imageUrl?: string
    imageAlt?: string
}
defineProps<{
    teaCardProps: TeaCardProps
}>()
</script>
<template>
    <div class="card">
        <img
            v-if="teaCardProps.imageUrl"
            :src="teaCardProps.imageUrl"
            :alt="teaCardProps.imageAlt"
        />
        <div class="card__content">
            <h2>{{ teaCardProps.title }}</h2>
            <a :href="teaCardProps.companyLink">{{ t('from') }}: {{ teaCardProps.company }}</a>
            <p>{{ teaCardProps.description }}</p>
            <p>{{ t('ingredients') }}: {{ teaCardProps.ingredients }}</p>
            <p>{{ t('instructions') }}: {{ teaCardProps.instructions }}</p>
        </div>
    </div>
</template>
