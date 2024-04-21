<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { GuestForm, StoreGuest, SupabaseGuestType, SupabaseRestriction } from '@/utils/types'
import AppCheckbox from './AppCheckbox.vue'
import AppRadio from './AppRadio.vue'
import AppOptionGroup from './AppOptionGroup.vue'
import { profileMessages } from '@/locales/profile/index'

const { t } = useI18n({ messages: profileMessages })
const props = defineProps<{
    guestTypes: SupabaseGuestType[]
    restrictions: SupabaseRestriction[]
    guest: StoreGuest | null
}>()

const guestClone = props.guest ? JSON.parse(JSON.stringify(props.guest)) : {}
const attendance: boolean = guestClone.attendance !== undefined ? guestClone.attendance : true
const form = ref<GuestForm>({
    guest_id: props.guest?.id || undefined,
    guest: {
        name: guestClone.name || '',
        user_id: guestClone.user_id || '',
        attendance: attendance,
        guest_type: guestClone.guest_type || 1,
        restriction_ids: guestClone.restriction_ids || []
    }
})

const restrictionInput = ref('')

const emit = defineEmits({
    // No validation
    click: null,

    // Validate submit event
    submit: ({ form }) => {
        if (form.guest.name && form.guest.guest_type) {
            return true
        } else {
            console.log(form)
            console.warn('Invalid submit event payload!')
            return false
        }
    },
    addRestriction: (restriction: string) => {
        if (restriction) {
            return true
        } else {
            console.warn('Invalid addRestriction event payload!')
            return false
        }
    }
})
function addRestriction(restriction: string) {
    emit('addRestriction', restriction)
    restrictionInput.value = ''
}
const formAction = computed(() => {
    return props.guest ? t('editGuest') : t('addGuest')
})

const showAddRestrictions = ref(false)
</script>
<template>
    <form class="max-w-max grid gap-4" @submit.prevent="emit('submit', { form })">
        <h2 class="text-2xl font-serif">{{ formAction }}</h2>
        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-grow">
                <label class="form-label" for="name">{{ t('fullName') }}</label>
                <input
                    class="form-input"
                    v-model="form.guest.name"
                    type="text"
                    id="name"
                    :placeholder="t('guestNamePlaceholder')"
                />
            </div>
            <div>
                <AppCheckbox
                    class="single-input"
                    :modelValue="form.guest.attendance"
                    name="attendance"
                    @update:modelValue="
                        (value) => {
                            form.guest.attendance = value
                        }
                    "
                >
                    {{ t('attendance') }}
                </AppCheckbox>
            </div>
        </div>
        <div>
            <AppOptionGroup name="guest_type" class="options-group__center" hideLabel>
                <template #label>
                    {{ t('guestType') }}
                </template>
                <AppRadio
                    v-for="guestType in guestTypes"
                    :key="guestType.id"
                    :modelValue="form.guest.guest_type ? form.guest.guest_type : 1"
                    :option="guestType"
                    name="guest_type"
                    @update:modelValue="(value) => (form.guest.guest_type = value)"
                />
            </AppOptionGroup>
        </div>
        <div>
            <AppOptionGroup name="guest_restrictions" class="my-4">
                <template #label>
                    {{ t('foodRestrictions') }}
                </template>
                <AppCheckbox
                    v-for="restriction in restrictions"
                    :key="restriction.id"
                    :modelValue="form.guest.restriction_ids?.includes(restriction.id)"
                    :name="restriction.name"
                    @update:modelValue="
                        (value) => {
                            if (value) {
                                form.guest.restriction_ids?.push(restriction.id)
                            } else {
                                form.guest.restriction_ids = form.guest.restriction_ids?.filter(
                                    (id) => id !== restriction.id
                                )
                            }
                        }
                    "
                >
                    {{ restriction.label[$i18n.locale] }}
                </AppCheckbox>
                <button
                    type="button"
                    @click.prevent="showAddRestrictions = !showAddRestrictions"
                    class="text-sm text-copper-300 ml-4 w-32 text-right"
                >
                    <span v-if="showAddRestrictions">
                        <strong class="text-lg">-</strong>
                        {{ t('showLess') }}
                    </span>
                    <span v-else>
                        <strong class="text-lg">+</strong>
                        {{ t('showMore') }}
                    </span>
                </button>
            </AppOptionGroup>
        </div>
        <div
            class="overflow-hidden transition-all duration-500 ease-in-out"
            :class="{
                'max-h-80': showAddRestrictions,
                'max-h-0': !showAddRestrictions
            }"
        >
            <div
                class="transition-opacity delay-200 ease-in-out pb-6 flex items-center"
                :class="{
                    'opacity-100': showAddRestrictions,
                    'opacity-0': !showAddRestrictions
                }"
            >
                <label class="form-label sr-only" for="customRestriction">{{
                    t('customRestriction')
                }}</label>
                <input
                    class="form-input rounded-r-none mt-0"
                    type="text"
                    v-model="restrictionInput"
                    id="customRestriction"
                    :placeholder="t('customRestrictionPlaceholder')"
                />
                <button
                    class="btn rounded-l-none flex-shrink-0"
                    type="button"
                    @click.prevent="addRestriction(restrictionInput)"
                >
                    {{ t('addCustomRestriction') }}
                </button>
            </div>
        </div>

        <button type="submit" class="btn">{{ formAction }}</button>
    </form>
</template>
