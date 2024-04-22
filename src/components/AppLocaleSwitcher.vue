<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
function setLocale(lang: string) {
    locale.value = lang
    localStorage.setItem('userLocale', lang)
}
</script>
<template>
    <div class="locale-switcher">
        <button
            class="locale-switcher__button btn btn--transparent btn--small"
            v-for="lang in $i18n.availableLocales"
            :key="`locale-${lang}`"
            @click="setLocale(lang)"
            :class="{ hidden: lang === locale }"
        >
            {{ lang }}
        </button>
    </div>
</template>
<style scoped lang="postcss">
.locale-switcher {
    @apply flex space-x-2;
    .locale-switcher__button {
        @apply uppercase font-bold font-sans;
    }
}
</style>
