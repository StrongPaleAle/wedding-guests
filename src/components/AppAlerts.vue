<script lang="ts" setup>
import { useAlerts } from '@/stores/alertsStore'

import { storeToRefs } from 'pinia'

const store = useAlerts()

const { items } = storeToRefs(store)
</script>

<template>
    <div class="notifications">
        <div
            :style="{
                right: '10px',
                bottom: '10px',
                alignItems: 'flex-start',
                flexWrap: 'wrap-reverse'
            }"
        >
            <div
                class="notifications__item"
                :class="[alert.style]"
                v-for="alert in items"
                :key="alert.id"
            >
                <div v-if="alert.html" v-html="alert.message"></div>
                <span v-else>{{ alert.message }}</span>
            </div>
        </div>
    </div>
</template>
<style scoped>
.notifications {
    @apply fixed z-50 flex flex-col-reverse items-end justify-end top-0 right-0 md:right-3 md:top-auto md:bottom-3 w-full md:max-w-lg;

    .notifications__item {
        @apply p-2 rounded-lg shadow-lg mb-2 bg-opacity-50 sm:text-lg border-2 text-center;
        &.success {
            @apply bg-green-500 bg-opacity-50 text-green-200 border-green-500;
        }
        &.error {
            @apply bg-red-500  text-red-200 border-red-500;
        }
        &.warning {
            @apply bg-yellow-500 text-yellow-200 border-yellow-500;
        }
        &.info {
            @apply bg-blue-500 text-blue-200 border-blue-500;
        }
        &.none {
            @apply bg-gray-500 text-gray-200 border-gray-500;
        }
    }
}
</style>
@/stores/alertsStore
