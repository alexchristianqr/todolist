import Vue from 'vue'
import App from './App.vue'

// BootstrapVue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// VueI18n
import messages from './locales'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  messages,
})

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  i18n,
}).$mount('#app')
