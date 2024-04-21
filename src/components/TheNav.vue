<script setup lang="ts">
import IconLogo from './icons/IconLogo.vue'

import { userSessionStore } from '@/stores/userSessionStore'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const userSession = userSessionStore()
</script>
<template>
    <header class="main-header">
        <nav>
            <RouterLink to="/" class="inline-block w-16 md:w-20">
                <IconLogo />
            </RouterLink>
            <div>
                <div v-if="userSession.user" class="nav-actions">
                    <RouterLink
                        v-if="$route.name !== 'RSVP'"
                        class="btn btn--small btn--secondary"
                        to="/rsvp"
                        >{{ t('profile') }}</RouterLink
                    >
                    <button
                        v-else
                        class="btn btn--small btn--secondary"
                        @click="userSession.signOut"
                    >
                        {{ t('signOut') }}
                    </button>
                </div>
                <div v-else class="nav-actions">
                    <RouterLink class="btn btn--small btn--secondary" to="/register">{{
                        t('signUp')
                    }}</RouterLink>
                    <RouterLink class="btn btn--small" to="/login">{{ t('signIn') }}</RouterLink>
                </div>
            </div>
        </nav>
    </header>
</template>
<style lang="postcss">
.main-header {
    @apply fixed isolate bottom-0 md:top-0 md:bottom-auto left-0 w-full text-white z-50 animate-fade-in-up;
    &:after {
        @apply absolute inset-0 -top-8 bg-gradient-to-t md:bg-gradient-to-b from-cyan-950  bg-opacity-40 backdrop-blur;
        content: '';
        z-index: -1;
        -webkit-mask: linear-gradient(transparent, black 50%);
        mask: linear-gradient(transparent, black 50%);
        @media (min-width: 768px) {
            -webkit-mask: linear-gradient(to top, transparent, black 50%);
            mask: linear-gradient(to top, transparent, black 50%);
        }
    }
    nav {
        @apply flex justify-between items-center p-1 pt-4 md:p-4 md:py-2 md:pb-8;
    }
    .nav-actions {
        @apply flex gap-2;
    }
    #logo {
        .circle {
            @apply fill-none;
            &__border {
                @apply fill-none;
            }
        }
    }
}
</style>
