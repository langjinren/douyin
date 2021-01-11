import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './plugins/resize.js'
import './assets/css/reset.css'

import { loadAllPlugins } from "@/plugins"

const app: ReturnType<typeof createApp> = createApp(App)

loadAllPlugins(app)

app
.use(router)
.mount("#app")
