<script setup lang="ts">
import { RouterView } from 'vue-router'
import { userSessionStore } from '@/stores/userSessionStore'

import AppAlerts from '@/components/AppAlerts.vue'
import TheNav from '@/components/TheNav.vue'

const userSession = userSessionStore()

userSession.sessionInit()
</script>

<template>
    <TheNav />
    <div class="page-wrapper">
        <div class="page-bg -z-10"></div>
        <RouterView />
    </div>
    <AppAlerts />
</template>
<style scoped lang="postcss">
.page-wrapper {
    @apply isolate flex justify-center items-center min-h-svh p-4 md:p-10 pb-28 md:pt-28 max-w-full;
}
.page-bg {
    @apply fixed inset-0 isolate;
    &:before {
        @apply absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 animate-fade-ultra;
        content: '';
        transform: translate3d(0, 0, 0);
        background-image: url('/assets/images/starbg_mobile.png');
        -webkit-mask: radial-gradient(circle farthest-side, transparent 50%, black);
        mask: radial-gradient(circle farthest-side, transparent 50%, black);
        @media (orientation: landscape) {
            background-image: url('/assets/images/starbg.png');
        }
    }

    &::after {
        @apply absolute inset-0 backdrop-blur-sm z-10;
        content: '';
        transform: translate3d(0, 0, 0);
        -webkit-mask: radial-gradient(circle farthest-side, black 70%, transparent);
        mask: radial-gradient(circle farthest-side, black 70%, transparent);
    }
}
</style>
