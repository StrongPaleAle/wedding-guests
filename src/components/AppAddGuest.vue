<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { guestsMetaStore } from '@/stores/guestsMetaStore'
import type { Guest } from '@/utils/types'

const form = ref<Partial<Guest>>({
    name: '',
    guest_type_id: 1,
    restrictions: []
})

const { t } = useI18n()
const guestsMeta = guestsMetaStore()
const guestTypes = guestsMeta.guestTypes
const restrictions = guestsMeta.restrictions
</script>
<template>
    <form>
        <div>
            <label for="name">{{ t('Name') }}</label>
            <input v-model="form.name" type="text" id="name" />
        </div>
        <div>
            <label for="guest_type_id">{{ t('Guest Type') }}</label>
            <select v-model="form.guest_type_id" id="guest_type_id">
                <option v-for="guestType in guestTypes" :key="guestType.id" :value="guestType.id">
                    {{ guestType.name }}
                </option>
            </select>
        </div>
        <div>
            <label for="restrictions">{{ t('Restrictions') }}</label>
            <select multiple v-model="form.restrictions" id="restrictions">
                <option
                    v-for="restriction in restrictions"
                    :key="restriction.id"
                    :value="restriction.id"
                >
                    {{ restriction.name }}
                </option>
            </select>
        </div>
        <button type="submit">{{ t('Add Guest') }}</button>
    </form>
</template>
