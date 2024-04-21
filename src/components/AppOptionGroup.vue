<script setup lang="ts">
defineProps<{
    name: string
    hideLabel?: boolean
}>()
</script>
<template>
    <fieldset :aria-labelledby="`${name}-label`">
        <div class="options-group">
            <p class="form-label" :id="`${name}-label`" :class="{ 'sr-only': hideLabel }">
                <slot name="label"></slot>
            </p>
            <div class="options-group_items">
                <slot></slot>
            </div>
        </div>
    </fieldset>
</template>
<style lang="postcss">
.options-group {
    &_items {
        @apply flex gap-3 sm:gap-4 flex-wrap;
    }
    &__center {
        .options-group_items {
            @apply flex justify-center;
        }
    }
}
</style>
