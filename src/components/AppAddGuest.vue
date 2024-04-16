<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { GuestData, SupabaseGuestType, SupabaseRestriction } from '@/utils/types'
import AppCheckbox from './AppCheckbox.vue'
import AppRadio from './AppRadio.vue'
import AppOptionGroup from './AppOptionGroup.vue'
import { profileMessages } from '@/locales/profile/index'

const { t } = useI18n({ messages: profileMessages })
defineProps<{
    guestTypes: SupabaseGuestType[]
    restrictions: SupabaseRestriction[]
}>()

const form = ref<GuestData>({
    name: '',
    user_id: '',
    attendance: true,
    guest_type: 1,
    restriction_ids: []
})

const restrictionInput = ref('')

const emit = defineEmits({
    // No validation
    click: null,

    // Validate submit event
    submit: ({ form }) => {
        if (form.name && form.guest_type) {
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
const showAddRestrictions = ref(false)
</script>
<template>
    <form class="max-w-max grid gap-4" @submit.prevent="emit('submit', { form })">
        <h2 class="text-2xl font-serif">{{ t('addGuest') }}</h2>
        <div class="flex gap-4">
            <div class="flex-grow">
                <label class="form-label" for="name">{{ t('fullName') }}</label>
                <input
                    class="form-input"
                    v-model="form.name"
                    type="text"
                    id="name"
                    :placeholder="t('guestNamePlaceholder')"
                />
            </div>
            <div>
                <AppCheckbox
                    class="single-input"
                    :modelValue="form.attendance"
                    name="attendance"
                    @update:modelValue="
                        (value) => {
                            form.attendance = value
                        }
                    "
                >
                    {{ t('attendance') }}
                </AppCheckbox>
            </div>
        </div>
        <div>
            <AppOptionGroup name="guest_type" hideLabel>
                <template #label>
                    {{ t('guestType') }}
                </template>
                <AppRadio
                    v-for="guestType in guestTypes"
                    :key="guestType.id"
                    :modelValue="form.guest_type ? form.guest_type : 1"
                    :option="guestType"
                    name="guest_type"
                    @update:modelValue="(value) => (form.guest_type = value)"
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
                    :modelValue="form.restriction_ids?.includes(restriction.id)"
                    :name="restriction.name"
                    @update:modelValue="
                        (value) => {
                            if (value) {
                                form.restriction_ids?.push(restriction.id)
                            } else {
                                form.restriction_ids = form.restriction_ids?.filter(
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

        <button type="submit" class="btn">{{ t('addGuest') }}</button>
    </form>
</template>
