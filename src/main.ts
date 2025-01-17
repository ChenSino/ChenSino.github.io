import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'animate.css/animate.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import all icons, solid图标库的包名为fas、regular图标库的包名为far、brands图标库的包名为fab */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(fas)
library.add(far)
library.add(fab)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
