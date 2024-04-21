import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createI18n } from 'vue-i18n'
import { defaultMessages } from './locales/system'
import App from './App.vue'
import router from './router'

import IconStar from './components/icons/IconStar.vue'

const browserLocale = navigator.language.split('-')[0]

const supportedLocales = ['en', 'it']

const locale = supportedLocales.includes(browserLocale) ? browserLocale : 'en'

const il8n = createI18n({
    legacy: false,
    locale: locale,
    messages: defaultMessages
})

const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(il8n)

app.component('IconStar', IconStar)

app.mount('#app')
