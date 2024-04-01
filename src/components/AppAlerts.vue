<script lang="ts" setup>
import { useAlerts } from '@/stores/alertsStore'

import { storeToRefs } from 'pinia'
import { reactive } from 'vue'

const store = useAlerts()
const { notify, remove } = store

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
    @apply fixed z-50 flex flex-col-reverse items-end justify-end right-3 bottom-3;
}
</style>
@/stores/alertsStore
