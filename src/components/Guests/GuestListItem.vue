<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { profileMessages } from '@/locales/profile'
import type { StoreGuest } from '@/utils/types'

import GuestAttendance from './GuestAttendance.vue'

const { t, locale } = useI18n({ messages: profileMessages })
const props = defineProps<{
    guest: StoreGuest
}>()
const restrictions = computed(() => {
    return props.guest.restrictions.map((restriction) => restriction.label[locale.value]).join(', ')
})
</script>
<template>
    <div class="guest-item card">
        <GuestAttendance :attendance="guest.attendance" class="sm:text-xl" />
        <div>
            <div class="flex items-center gap-2">
                <h3 class="font-semibold text-copper-200 sm:text-lg">
                    {{ guest.name }}
                </h3>
                <small class="sm:text-base">{{ guest.guest_type_obj.label[locale] }}</small>
            </div>
            <div class="text-xs sm:text-sm text-copper-100 text-ellipsis text-nowrap">
                {{ restrictions }}
            </div>
        </div>

        <div class="flex-grow flex justify-end">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped lang="postcss">
.guest-item {
    @apply flex items-center gap-2 sm:gap-3 px-4 py-2 sm:py-3 -mx-4 even:bg-teal-700 even:bg-opacity-20 border-t border-cyan-700;
    + .guest-item {
        @apply mb-2;
    }
}
</style>
