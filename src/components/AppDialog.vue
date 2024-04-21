<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const props = defineProps({
    show: Boolean
})
const { t } = useI18n()
</script>

<template>
    <Transition name="BaseModal">
        <div v-if="show" class="BaseModal" tabindex="-1">
            <div class="BaseModal__container">
                <div class="BaseModal__body">
                    <slot></slot>
                    <button
                        class="BaseModal__close-button hidden sm:inline-block"
                        @click="$emit('close')"
                    >
                        <FontAwesomeIcon :icon="faCircleXmark" />
                        <span class="sr-only">{{ t('close') }}</span>
                    </button>
                </div>
            </div>
            <button class="BaseModal__close-button sm:hidden" @click="$emit('close')">
                <FontAwesomeIcon :icon="faCircleXmark" />
                <span class="sr-only">{{ t('close') }}</span>
            </button>
        </div>
    </Transition>
</template>
<style lang="postcss">
.BaseModal {
    @apply fixed 
    inset-0 
    z-40 
    flex 
    sm:items-center 
    justify-center 
    bg-black 
    bg-opacity-70
    backdrop-blur-sm
    p-4;
    &__container {
        @apply relative 
          w-full 
          h-full
          max-w-screen-2xl
          overflow-y-auto
          mx-auto 
          flex
          items-start
          sm:items-center
            justify-center
          sm:overflow-visible
          md:p-2
          pb-14
          md:pt-12;
    }
    &__body {
        @apply w-max
            p-4
            md:p-10
            bg-cyan-950
            bg-opacity-90
            relative
            rounded-xl
            
            h-auto;
    }
    &__close-button {
        @apply absolute 
            top-0 
            right-0
            sm:-translate-y-1/3
            sm:translate-x-1/3
            p-0
            pb-1.5
            text-3xl
            leading-tight	
            text-copper
            focus:outline-none;
    }
    &-enter-active,
    &-leave-active {
        transition: opacity 0.5s ease;
    }

    &-leave-to,
    &-enter-from {
        opacity: 0;
    }

    &-enter-from,
    &-leave-to {
        .modal-container {
            transform: scale(1.1);
        }
    }
}
</style>
