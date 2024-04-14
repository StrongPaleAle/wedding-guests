<script setup lang="ts">
import { computed } from 'vue'
import type { Option } from '@/utils/types'

const props = defineProps<{
    modelValue: string | number
    option: Option
    name?: string
}>()
// dimply emit an event with the new value. This can be used everywhere.
const emit = defineEmits(['update:modelValue'])
const model = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
</script>
<template>
    <label class="input-group">
        <input
            class="form-radio"
            v-model="model"
            type="radio"
            :name="name"
            :value="option.id"
            :id="`${name}-${option.name}`"
        />
        <span>{{ option.label[$i18n.locale] }}</span>
    </label>
</template>
