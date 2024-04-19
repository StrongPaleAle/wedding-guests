<script setup lang="ts">
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
    view: 'list' | 'table'
}>()
defineEmits(['edit', 'delete'])
</script>
<template>
    <div class="table-wrapper card">
        <table class="guest-table">
            <thead>
                <tr>
                    <th>{{ t('fullName') }}</th>
                    <th>{{ t('attendance') }}</th>
                    <th>{{ t('guestType') }}</th>
                    <th>{{ t('foodRestrictions') }}</th>
                    <th>{{ t('actions') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="guest in guests" :key="`guest-${guest.id}`">
                    <td class="font-semibold text-copper-100">{{ guest.name }}</td>
                    <td>
                        <span class="text-green-500" v-if="guest.attendance">
                            <FontAwesomeIcon :icon="faCircleCheck" />
                            <span class="sr-only">{{ t('attending') }}</span>
                        </span>
                        <span class="text-red-500" v-else>
                            <FontAwesomeIcon :icon="faCircleXmark" />
                            <span class="sr-only">{{ t('notAttending') }}</span>
                        </span>
                    </td>
                    <td>
                        <span v-if="guest.guest_type_obj.label">
                            {{ guest.guest_type_obj.label[$i18n.locale] }}
                        </span>
                    </td>
                    <td>
                        <span v-if="guest.restrictions.length === 0">{{ t('none') }}</span>
                        <span
                            v-else
                            v-for="restriction in guest.restrictions"
                            :key="restriction.name"
                            >{{ restriction.label[$i18n.locale] }}</span
                        >
                    </td>
                    <td>
                        <div class="actions">
                            <button @click="$emit('edit', guest)">
                                <FontAwesomeIcon :icon="faEdit" />
                                <small>{{ t('edit') }}</small>
                            </button>
                            <button @click="$emit('delete', guest)">
                                <FontAwesomeIcon :icon="faTrash" />
                                <small>{{ t('delete') }}</small>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style lang="postcss">
.guest-table {
    @apply w-full table-auto;

    thead > tr {
        @apply bg-teal-500 bg-opacity-20 text-copper-200 rounded-t-lg text-lg;
    }
    tr {
        @apply even:bg-teal-700 even:bg-opacity-20;
    }
    td,
    th {
        @apply text-center px-4 py-3 first:pl-8 last:pr-8 first:text-left last:text-right;
    }
    .actions {
        @apply flex gap-4 justify-end;
    }
    button {
        @apply text-copper-300 inline-flex items-center gap-1;
        small {
            @apply sr-only;
        }
    }
}
</style>
