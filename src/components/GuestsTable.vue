<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { profileMessages } from '@/locales/profile'
import type { StoreGuest } from '@/utils/types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const { t } = useI18n({ messages: profileMessages })
const props = defineProps<{
    guests: StoreGuest[]
}>()
defineEmits(['edit', 'delete'])
</script>
<template>
    <table class="guest-table">
        <thead>
            <tr>
                <th class="px-4 py-2">{{ t('fullName') }}</th>
                <th class="px-4 py-2">{{ t('attendance') }}</th>
                <th class="px-4 py-2">{{ t('guestType') }}</th>
                <th class="px-4 py-2">{{ t('foodRestrictions') }}</th>
                <th class="px-4 py-2">{{ t('actions') }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="guest in guests" :key="`guest-${guest.id}`">
                <td class="border px-4 py-2">{{ guest.name }}</td>
                <td class="border px-4 py-2">
                    <span class="text-green-500" v-if="guest.attendance">
                        <FontAwesomeIcon :icon="faCircleCheck" />
                        <span class="sr-only">{{ t('attending') }}</span>
                    </span>
                    <span class="text-red-500" v-else>
                        <FontAwesomeIcon :icon="faCircleXmark" />
                        <span class="sr-only">{{ t('notAttending') }}</span>
                    </span>
                </td>
                <td class="border px-4 py-2">
                    <span v-if="guest.guest_type_obj.label">
                        {{ guest.guest_type_obj.label[$i18n.locale] }}
                    </span>
                </td>
                <td class="border px-4 py-2">
                    <span v-if="guest.restrictions.length === 0">{{ t('none') }}</span>
                    <span
                        v-else
                        v-for="restriction in guest.restrictions"
                        :key="restriction.name"
                        >{{ restriction.label[$i18n.locale] }}</span
                    >
                </td>
                <td class="border px-4 py-2">
                    <button @click="$emit('edit', guest.id)">
                        <FontAwesomeIcon :icon="faEdit" />
                        {{ t('edit') }}
                    </button>
                    <button @click="$emit('delete', guest.id)">
                        <FontAwesomeIcon :icon="faTrash" />
                        {{ t('delete') }}
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<style lang="postcss">
.guest-table {
    @apply w-full table-auto border-collapse;
}
</style>
