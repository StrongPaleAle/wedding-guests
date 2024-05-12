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
</script>
<template>
    <div>
        <HomeHero />
        <h2
            class="mt-10 md:mt-20 text-center text-3xl sm:text-5xl md:text-zxl font-serif text-copper-300"
        >
            Grazie!
        </h2>
        <TeaCard :teaCardProps="cherryBlossomTea" />
    </div>
</template>
