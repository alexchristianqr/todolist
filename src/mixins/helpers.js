import Vue from 'vue'
import dayjs from 'dayjs'

Vue.mixin({
  methods: {
    existsStorage(nameDB) {
      return !!localStorage.getItem(`${nameDB}`)
    },
    setStorage(name, value) {
      const bodyJson = JSON.stringify(value)
      return localStorage.setItem(name, bodyJson)
    },
    getStorage(name) {
      return JSON.parse(localStorage.getItem(name))
    },
    removeStorage(name) {
      return localStorage.removeItem(name)
    },
    /**
     * Validar estado del input en formulario
     * @param ref
     * @returns {*}
     */
    validateState(ref) {
      if (!this.$refs.form) return
      if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
        return !this.veeErrors.has(ref)
      }
    },
    /**
     * Modal notificación para validar una acción
     * @param message
     * @param title
     * @param size
     * @param okVariant
     * @param okTitle
     * @param cancelTitle
     * @param hideHeaderClose
     * @param centered
     * @param footerClass
     * @param noCloseOnEsc
     * @param noCloseOnBackdrop
     * @return {Promise<any> | Promise}
     */
    messageBoxConfirm({
      message,
      title = 'Notificación',
      size = 'md',
      okVariant = 'primary',
      okTitle = 'Aceptar',
      cancelTitle = 'Cancelar',
      hideHeaderClose = true,
      centered = false,
      footerClass = 'justify-content-center',
      noCloseOnEsc = true,
      noCloseOnBackdrop = true,
    }) {
      return new Promise((resolve, reject) => {
        this.$bvModal
          .msgBoxConfirm(message, {
            title,
            size,
            okVariant,
            okTitle,
            cancelTitle,
            hideHeaderClose,
            centered,
            footerClass,
            noCloseOnEsc,
            noCloseOnBackdrop,
          })
          .then((value) => {
            resolve(value)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    /**
     * Clonar data inmutable
     * @param value
     * @return {*}
     */
    cloneImmutable(value) {
      const dataImmutable = JSON.parse(JSON.stringify(value))
      console.log('[Helper.cloneImmutable]', { dataImmutable })
      return dataImmutable
    },
    /**
     * Format date con la libreria dayjs | format
     * @param date
     * @param format
     * @return {string}
     */
    formatDate(date, format = 'DD/MM/YYYY') {
      if (date) return dayjs(date).format(format)
      return dayjs().format(format)
    },
    /**
     * Format date con la libreria dayjs | dayjs
     * @param parse
     * @return {dayjs.Dayjs | *}
     */
    dayjsMixin(parse) {
      return dayjs(parse)
    },
    /**
     * Format date con la libreria dayjs | add
     * @param date
     * @param increment
     * @param field
     * @returns {string}
     */
    formatISOString({ date, increment, field }) {
      console.log('[Helper.formatISOString]')

      if (increment) {
        if (date) return dayjs(dayjs(date).add(increment, field)).toISOString()
        return dayjs().toISOString()
      } else {
        if (date) return dayjs(dayjs(date).add(increment, field)).toISOString()
        return dayjs(dayjs().add(increment, field)).toISOString()
      }
    },
    /**
     * Format date con la libreria dayjs
     * @param date
     * @return {dayjs.Dayjs | *}
     */
    formatDayjs(date) {
      if (date) return dayjs(date)
      return dayjs()
    },
  },
})
