<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { homeMessages } from '@/locales/home'
import AppStarDivider from '@/components/AppStarDivider.vue'

const { locale } = useI18n({ messages: homeMessages })

const order = Math.random() > 0.5
</script>
<template>
    <AppStarDivider class="mb-2 md:mb-4" />
    <h1 class="font-serif text-7xl animate-fade-in-slow text-white">
        <span :class="[order ? 'alessio' : 'erika']">{{ order ? 'Alessio' : 'Erika' }}</span>
        <small>&</small>
        <span :class="[!order ? 'alessio' : 'erika']">{{ !order ? 'Alessio' : 'Erika' }}</span>
    </h1>
    <p class="font-serif text-center text-shadow text-copper-200 text-2xl sm:text-3xl md:text-4xl">
        <span class="animate-fade-in-slow" v-if="locale === 'it'"> 18 Maggio 2024 </span>
        <span class="animate-fade-in-slow" v-else> 18<sup>th</sup> May 2024 </span>
    </p>
    <AppStarDivider class="mt-4 md:mt-6" />
</template>
<style lang="postcss">
h1 {
    @apply text-center text-shadow flex items-center justify-center flex-col;
    span {
        @apply block relative leading-none;

        &.alessio {
            &:last-child {
                @apply -top-4;
            }
        }
    }
    small {
        @apply text-2xl sm:text-3xl md:text-4xl block relative leading-none text-copper;
    }
}
</style>
