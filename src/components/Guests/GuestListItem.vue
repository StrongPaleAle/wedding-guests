<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { profileMessages } from '@/locales/profile'
import type { StoreGuest } from '@/utils/types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
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
        <GuestAttendance :attendance="guest.attendance" />
        <div>
            <div class="flex items-center gap-1">
                <h3 class="font-semibold text-copper-200">{{ guest.name }}</h3>
                <small>{{ guest.guest_type_obj.label[locale] }}</small>
            </div>
        </div>

        <div class="flex-grow flex justify-end">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped lang="postcss">
.guest-item {
    @apply flex items-center gap-1 px-4 py-2 -mx-4 even:bg-teal-700 even:bg-opacity-20 border-t border-cyan-700;
    + .guest-item {
        @apply mb-2;
    }
}
</style>
