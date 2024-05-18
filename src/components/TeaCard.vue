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
    <div class="card tea-card">
        <img
            v-if="teaCardProps.imageUrl"
            :src="teaCardProps.imageUrl"
            :alt="teaCardProps.imageAlt"
        />
        <div class="card__content">
            <div>
                <h2>{{ teaCardProps.title }}</h2>
                <p>
                    <span class="from-label">{{ t('from') }}: </span>
                    <a :href="teaCardProps.companyLink"> {{ teaCardProps.company }}</a>
                </p>
            </div>
            <p class="italic text-base">{{ teaCardProps.description }}</p>
            <p>
                <span>{{ t('ingredients') }}: </span> {{ teaCardProps.ingredients }}
            </p>
            <p>
                <span>{{ t('instructions') }}: </span> {{ teaCardProps.instructions }}
            </p>
        </div>
    </div>
</template>
<style scoped lang="postcss">
.tea-card {
    @apply flex flex-col sm:flex-row sm:odd:flex-row-reverse sm:odd:text-right items-start md:items-center p-4 sm:p-6 gap-2 md:gap-6;

    img {
        @apply w-full sm:max-w-56 md:max-w-xs lg:max-w-md rounded-lg;
    }
    .card__content {
        @apply flex flex-col gap-2 md:gap-4 max-w-prose text-sm flex-grow;
        span {
            @apply font-bold text-copper-200 text-base block;
            &.from-label {
                @apply inline;
            }
        }
        a {
            @apply hover:text-copper-300 hover:underline;
        }
    }
    h2 {
        @apply text-2xl sm:text-3xl md:text-4xl font-serif text-copper-300;
    }
}
</style>
