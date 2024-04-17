export interface Profile {
    username: string | null
    user_group: number
}
export interface Label {
    en: string
    it: string
    [key: string]: string
}
export interface Option {
    id: number
    name: string
    label: Label
}
export type SupabaseGuestType = Option

export interface SupabaseRestriction extends Option {
    public: boolean
}
export interface GuestBase {
    name: string
    user_id: string
    guest_type: number
    attendance: boolean
}
export interface SupabaseGuest extends GuestBase {
    id: number
}

export interface GuestData extends GuestBase {
    restriction_ids: number[]
}
export interface StoreGuest extends SupabaseGuest {
    restriction_ids: number[]
    guest_type_obj: Option
    restrictions: SupabaseRestriction[]
}
export interface GuestForm {
    guest_id?: number
    guest: GuestData
}
