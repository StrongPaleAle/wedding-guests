<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HomeHero from '@/components/Home/HomeHero.vue'
import HomeContentEn from '@/components/Home/HomeContentEn.vue'
import HomeContentIt from '@/components/Home/HomeContentIt.vue'

const { locale } = useI18n()
</script>

<template>
    <div>
        <HomeHero />
        <HomeContentIt v-if="locale === 'it'" />
        <HomeContentEn v-else />
    </div>
</template>
