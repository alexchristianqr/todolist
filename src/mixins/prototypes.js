import Vue from 'vue'
import VeeValidate from 'vee-validate'
import es from './lang/es'
import VueToast from 'vue-toast-notification'

// Use VeeValidate
Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: 'veeFields',
  errorBagName: 'veeErrors',
})
VeeValidate.Validator.localize('es', es)

// Use VueToast
Vue.use(VueToast, {
  position: 'top',
  type: 'default',
  duration: 2500,
})
