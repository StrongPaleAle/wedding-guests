<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HomeHero from '@/components/Home/HomeHero.vue'
import HomeContentEn from '@/components/Home/HomeContentEn.vue'
import HomeContentIt from '@/components/Home/HomeContentIt.vue'

const { t, locale } = useI18n()
</script>

<template>
    <div>
        <HomeHero />
        <div class="my-10 text-center">
            <RouterLink to="/ceremony" class="btn">
                {{ t('ceremony') }}
            </RouterLink>
        </div>
        <HomeContentIt v-if="locale === 'it'" />
        <HomeContentEn v-else />
    </div>
</template>
