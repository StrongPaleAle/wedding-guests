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
    username: '',
    email: '',
    password: ''
})

const showPassword = ref(false)

const emit = defineEmits({
    // No validation
    click: null,

    // Validate submit event
    submit: ({ email, password, username }) => {
        if (email && password && username) {
            return true
        } else {
            console.warn('Invalid submit event payload!')
            return false
        }
    }
})

function submitForm(email: string, password: string, username: string) {
    emit('submit', { email, password, username })
}
</script>
<template>
    <div>
        <form
            class="grid grid-cols-1 gap-4"
            @submit.prevent="submitForm(form.email, form.password, form.username)"
        >
            <label class="form-label">
                <span class="block">{{ t('username') }}</span>
                <input
                    class="form-input"
                    v-model="form.username"
                    :id="id + '-username'"
                    type="text"
                    :placeholder="t('usernamePlaceholder')"
                />
            </label>
            <label class="form-label">
                <span class="block">Email</span>
                <input
                    class="form-input"
                    v-model="form.email"
                    :id="id + '-email'"
                    type="email"
                    :placeholder="t('emailPlaceholder')"
                />
            </label>
            <label class="form-label relative">
                <span class="block">Password</span>
                <input
                    class="form-input"
                    v-model="form.password"
                    :id="id + '-password'"
                    type="password"
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

            <button class="btn mt-8">{{ action }}</button>
        </form>
    </div>
</template>
