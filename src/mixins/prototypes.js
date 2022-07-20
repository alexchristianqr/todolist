import Vue from 'vue'

// Use BootstrapVue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// Use VeeValidate
import es from './lang/es'
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: 'veeFields',
  errorBagName: 'veeErrors',
})
VeeValidate.Validator.localize('es', es)

// Use VueToast
import VueToast from 'vue-toast-notification'
Vue.use(VueToast, {
  position: 'top',
  type: 'default',
  duration: 2500,
})
