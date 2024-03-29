<script setup lang="ts">
import { ref } from 'vue'
defineProps<{
    id: string
    action: string
}>()
const form = ref({
    email: '',
    password: ''
})
const emit = defineEmits({
    // No validation
    click: null,

    // Validate submit event
    submit: ({ email, password }) => {
        if (email && password) {
            return true
        } else {
            console.warn('Invalid submit event payload!')
            return false
        }
    }
})

function submitForm(email: string, password: string) {
    emit('submit', { email, password })
}
</script>
<template>
    <div>
        <form
            class="grid grid-cols-1 gap-6"
            @submit.prevent="submitForm(form.email, form.password)"
        >
            <input v-model="form.email" :id="id + '-email'" type="email" placeholder="Email" />
            <input
                v-model="form.password"
                :id="id + '-password'"
                type="password"
                placeholder="Password"
            />
            <button class="btn">{{ action }}</button>
        </form>
    </div>
</template>
