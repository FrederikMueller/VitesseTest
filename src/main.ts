import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'
import vuetify from './plugins/vuetify'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages
});

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(vuetify)
app.mount('#app')
