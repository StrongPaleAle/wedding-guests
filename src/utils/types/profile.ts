export interface Profile {
    username: string | null
    user_group: number
}
export interface Label {
    en: string
    it: string
}
export interface SupabaseGuest {
    id: number
    name: string
    user: string
    guest_type_id: number
}
export interface SupabaseGuestType {
    id: number
    name: string
    label: Label
}

export interface SupabaseRestriction {
    id: number
    name: string
    label: Label
    public: boolean
}

export interface Guest extends SupabaseGuest {
    guest_type: SupabaseGuestType
    restrictions: SupabaseRestriction[]
}
