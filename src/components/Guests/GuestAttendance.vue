<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
defineProps<{
    attendance: boolean
}>()
</script>
<template>
    <span v-if="attendance" class="text-green-500">
        <FontAwesomeIcon :icon="faCircleCheck" />
        <span class="sr-only">{{ t('attending') }}</span>
    </span>
    <span v-else class="text-red-500">
        <FontAwesomeIcon :icon="faCircleXmark" />
        <span class="sr-only">{{ t('notAttending') }}</span>
    </span>
</template>
