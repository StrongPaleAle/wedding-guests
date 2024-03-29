import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'

const browserLocale = navigator.language.split('-')[0]

const supportedLocales = ['en', 'it']

const locale = supportedLocales.includes(browserLocale) ? browserLocale : 'en'

const il8n = createI18n({
    legacy: false,
    locale: locale,
    messages: {
        en: {
            welcome: 'Welcome to our app',
            backHome: 'Go back home'
        },
        it: {
            welcome: 'Benvenuto nella nostra app',
            backHome: 'Torna alla home'
        }
    }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(il8n)

app.mount('#app')
