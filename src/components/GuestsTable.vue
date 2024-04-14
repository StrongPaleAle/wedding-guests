<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { profileMessages } from '@/locales/profile'
import type { StoreGuest } from '@/utils/types'

const { t } = useI18n({ messages: profileMessages })
const props = defineProps<{
    guests: StoreGuest[]
}>()
</script>
<template>
    <table class="table-auto w-full">
        <thead>
            <tr>
                <th class="px-4 py-2">{{ t('fullName') }}</th>
                <th class="px-4 py-2">{{ t('attendance') }}</th>
                <th class="px-4 py-2">{{ t('guestType') }}</th>
                <th class="px-4 py-2">{{ t('foodRestrictions') }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="guest in guests" :key="guest.id">
                <td class="border px-4 py-2">{{ guest.name }}</td>
                <td class="border px-4 py-2">{{ guest.attendance }}</td>
                <td class="border px-4 py-2">{{ guest.guest_type_obj }}</td>
                <td class="border px-4 py-2">{{ guest.restrictions }}</td>
            </tr>
        </tbody>
    </table>
</template>
