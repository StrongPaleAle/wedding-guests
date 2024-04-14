<script setup lang="ts">
import { computed } from 'vue'

type CheckType = 'check' | 'toggle'

const props = defineProps({
    modelValue: { type: Boolean },
    value: { type: Boolean },
    name: { type: String }, // used for input name and id
    checkType: {
        // used for data-type attribute, that is used for styling (normal checkbox or toggle switch)
        validator(value: CheckType) {
            // The value must match one of these strings
            return ['check', 'toggle'].includes(value)
        },
        default: 'check'
    },
    disabled: { type: Boolean, default: false }
})
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
    <label class="input-group" :data-type="checkType">
        <input
            class="form-checkbox"
            :name="name"
            :id="name"
            type="checkbox"
            v-model="model"
            :value="value"
            :disabled="disabled"
        />
        <span class="input-group__label">
            <slot></slot>
        </span>

        <!-- <span class="checkbox__check">
      <IconCheck v-if="checkType === 'check'" />
      <span v-else></span>
    </span> -->
    </label>
</template>
