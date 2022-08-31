import Vue from 'vue'
import App from './App.vue'
import { store } from './store'

// Use global mixins
import './mixins'

// Use VueI18n
import messages from './locales'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'es',
  messages,
})

Vue.config.productionTip = false

new Vue({
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
