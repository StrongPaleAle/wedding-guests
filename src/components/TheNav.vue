<script setup lang="ts">
import IconLogo from './icons/IconLogo.vue'

import { userSessionStore } from '@/stores/userSessionStore'
import { useI18n } from 'vue-i18n'
import AppLocaleSwitcher from './AppLocaleSwitcher.vue'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const userSession = userSessionStore()
const router = useRouter()

async function signOut() {
    await userSession.signOut()
    router.push('/')
}
</script>
<template>
    <header class="main-header max-w-svw">
        <nav>
            <RouterLink to="/" class="inline-block w-16 md:w-20">
                <IconLogo />
            </RouterLink>
            <div>
                <div class="nav-actions">
                    <AppLocaleSwitcher class="mr-1 sm:mr-2" />
                    <!-- <RouterLink to="/something-brewing" class="btn btn--transparent btn--small">
                        {{ t('favors') }}
                    </RouterLink> -->
                    <RouterLink
                        v-if="$route.name !== 'RSVP' && userSession.user"
                        class="btn btn--small btn--secondary"
                        to="/rsvp"
                    >
                        {{ t('profile') }}
                    </RouterLink>
                    <button
                        v-if="userSession.user && $route.name === 'RSVP'"
                        class="btn btn--small btn--secondary"
                        @click="signOut"
                    >
                        {{ t('signOut') }}
                    </button>

                    <RouterLink
                        v-if="!userSession.user"
                        class="btn btn--small btn--secondary"
                        to="/register"
                    >
                        {{ t('signUp') }}
                    </RouterLink>
                    <RouterLink v-if="!userSession.user" class="btn btn--small" to="/login">
                        {{ t('signIn') }}
                    </RouterLink>
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
        @apply flex justify-between items-end sm:items-center p-1 pt-4 md:p-4 md:py-2 md:pb-8 max-w-screen-xl mx-auto;
    }
    .nav-actions {
        @apply flex gap-2 mb-2 md:mb-0;
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
