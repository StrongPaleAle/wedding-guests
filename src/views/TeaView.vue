<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HomeHero from '@/components/Home/HomeHero.vue'

const { locale } = useI18n()
</script>
<template>
    <div>
        <HomeHero />
        <h2
            class="mt-10 md:mt-20 text-center text-3xl sm:text-5xl md:text-zxl font-serif text-copper-300"
        >
            Grazie!
        </h2>
    </div>
</template>
