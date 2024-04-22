<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

defineProps<{
    id: string
    action: string
}>()

const { t } = useI18n()

const form = ref({
    email: '',
    password: ''
})

const showPassword = ref(false)

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
            <label class="form-label" :for="id + '-email'">
                Email
                <input
                    class="form-input"
                    v-model="form.email"
                    :id="id + '-email'"
                    type="email"
                    :placeholder="t('emailPlaceholder')"
                />
            </label>
            <label class="form-label relative" :for="id + '-password'">
                Password
                <input
                    class="form-input"
                    v-model="form.password"
                    :id="id + '-password'"
                    :type="showPassword ? 'text' : 'password'"
                    :placeholder="t('passwordPlaceholder')"
                />
                <button
                    class="absolute right-2 bottom-[0.6rem]"
                    type="button"
                    @click="showPassword = !showPassword"
                >
                    <FontAwesomeIcon :icon="showPassword ? faEyeSlash : faEye" />
                </button>
            </label>
            <div class="text-center">
                <button class="btn">{{ action }}</button>
            </div>
        </form>
    </div>
</template>
