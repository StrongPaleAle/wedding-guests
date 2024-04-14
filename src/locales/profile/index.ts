import { defaultMessages } from '../system/index'
export const profileMessages = {
    en: {
        ...defaultMessages.en,
        guestAddSuccess: 'Guest added successfully',
        addGuest: 'Add Guest',
        guestNamePlaceholder: 'Guest name and surname',
        attendance: 'Attendance',
        guestType: 'Guest type',
        foodRestrictions: 'Food restrictions',
        customRestriction: 'Add a new restriction',
        customRestrictionPlaceholder: 'Restriction name',
        addCustomRestriction: 'Add restriction'
    },
    it: {
        ...defaultMessages.it,
        guestAddSuccess: 'Ospite aggiunto con successo',
        addGuest: 'Aggiungi Ospite',
        guestNamePlaceholder: "Nome e cognome dell'ospite",
        attendance: 'Presenza',
        guestType: 'Tipo di ospite',
        foodRestrictions: 'Restrizioni alimentari',
        customRestriction: 'Aggiungi una nuova restrizione',
        customRestrictionPlaceholder: 'Nome restrizione',
        addCustomRestriction: 'Aggiungi restrizione'
    }
}
