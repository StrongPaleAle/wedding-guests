<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HomeHero from '@/components/Home/HomeHero.vue'
import { homeMessages } from '../locales/home'
import TeaCard from '@/components/TeaCard.vue'

const { t } = useI18n({ messages: homeMessages })

const cherryBlossomTea = {
    title: t('CBtitle'),
    company: t('CBcompany'),
    companyLink: t('CBcompanyLink'),
    description: t('CBdescription'),
    ingredients: t('CBingredients'),
    instructions: t('CBinstructions'),
    imageUrl: '/assets/images/cherry-blossom-tea.jpg',
    imageAlt: ''
}
const lovePotionTea = {
    title: t('LPtitle'),
    company: t('LPcompany'),
    companyLink: t('LPcompanyLink'),
    description: t('LPdescription'),
    ingredients: t('LPingredients'),
    instructions: t('LPinstructions'),
    imageUrl: '/assets/images/love-potion-tea.jpg',
    imageAlt: ''
}
</script>
<template>
    <div>
        <HomeHero />
        <h2
            class="mt-10 md:mt-20 text-center text-5xl sm:text-6xl md:text-7xl font-serif text-copper-300"
        >
            Grazie!
        </h2>

        <TeaCard :teaCardProps="cherryBlossomTea" class="mt-6 lg:mt-10" />
        <TeaCard :teaCardProps="lovePotionTea" class="mt-6 lg:mt-10" />
    </div>
</template>
