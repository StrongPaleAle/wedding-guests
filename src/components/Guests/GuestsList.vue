<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { profileMessages } from '@/locales/profile'
import type { StoreGuest } from '@/utils/types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import GuestListItem from './GuestListItem.vue'

const { t } = useI18n({ messages: profileMessages })
const props = defineProps<{
    guests: StoreGuest[]
}>()
defineEmits(['edit', 'delete'])
</script>
<template>
    <div class="guest-list">
        <GuestListItem v-for="guest in guests" :key="`guest-${guest.id}`" :guest="guest">
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
        </GuestListItem>
    </div>
</template>
<style scoped lang="postcss">
.actions {
    @apply flex gap-4 justify-end sm:text-xl;
    button {
        @apply text-copper-200 inline-flex items-center gap-1;
        small {
            @apply sr-only;
        }
    }
}
</style>
