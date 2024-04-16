<script setup lang="ts">
const props = defineProps({
    show: Boolean
})
</script>

<template>
    <Transition name="BaseModal">
        <div v-if="show" class="BaseModal" tabindex="-1">
            <div class="BaseModal__container">
                <div class="BaseModal__body">
                    <slot></slot>
                </div>

                <button class="BaseModal__close-button" @click="$emit('close')">Close</button>
            </div>
        </div>
    </Transition>
</template>
<style lang="postcss">
.BaseModal {
    @apply fixed 
    inset-0 
    z-50 
    flex 
    items-center 
    justify-center 
    bg-black 
    bg-opacity-80
    backdrop-blur-sm
    p-4;
    &__container {
        @apply relative 
          w-full 
          h-full
          max-w-screen-2xl
          mx-auto 
          flex
            items-center
            justify-center
          overflow-hidden
          pt-12;
    }
    &__body {
        @apply w-max
        p-4
        md:p-10
            bg-cyan-950
            bg-opacity-90
            
            rounded-xl
            overflow-hidden
            h-auto;
    }
    &__close-button {
        @apply absolute 
            top-0 
            right-0 
            p-0
            pb-1.5
            text-lg
            leading-tight	
            text-white 
            border-b
            border-white
            border-opacity-30
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
