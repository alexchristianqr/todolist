<template>
  <b-modal
    ref="modal"
    v-model="modal.status"
    :title="modal.title"
    :ok-title="modal.oktitle"
    :cancel-title="modal.canceltitle"
    :size="modal.size"
    :body-class="modal.bodyclass"
    :footer-class="modal.footerclass"
    :hide-footer="modal.hidefooter"
    :centered="modal.centered"
    :ok-disabled="loadingButton"
    :cancel-disabled="loadingButton"
    :no-close-on-esc="loadingButton || modal.esc"
    :no-close-on-backdrop="loadingButton || modal.backdrop"
    @ok.prevent="okModal"
  >
    <!--    <pre>{{ modalParams }}</pre>-->
    <b-form ref="form">
      <!--Alert Notification-->
      <Alert :alert="alertNotification" />
      <!---->
      <b-form-group :label="$t('ModalUpdateOrCreate.form.title')">
        <b-form-input v-model="modalParams.title" name="title" v-validate="{ required: true }" :state="validateState('title')"></b-form-input>
        <b-form-invalid-feedback>{{ veeErrors.first('title') }}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group :label="$t('ModalUpdateOrCreate.form.description')">
        <b-form-textarea v-model="modalParams.description" name="description" v-validate="{ required: true }" :state="validateState('description')"></b-form-textarea>
        <b-form-invalid-feedback>{{ veeErrors.first('description') }}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group :label="$t('ModalUpdateOrCreate.form.expiredAt')">
        <b-form-datepicker v-model="modalParams.expiredAt" name="expiredAt" v-validate="{ required: true }" :state="validateState('expiredAt')"></b-form-datepicker>
        <b-form-invalid-feedback>{{ veeErrors.first('expiredAt') }}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group v-if="!modalParams.isPost" :label="$t('ModalUpdateOrCreate.form.status')">
        <b-form-select v-model="modalParams.status" name="status" v-validate="{ required: true }" :state="validateState('status')" :options="optionsStatuses" class="w-50 mr-1">
          <template #first>
            <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
          </template>
        </b-form-select>
        <b-form-invalid-feedback>{{ veeErrors.first('status') }}</b-form-invalid-feedback>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalUpdateOrCreate',
  props: {
    modal: {
      type: Object,
    },
    modalParams: {
      type: Object,
    },
  },
  computed: {
    optionsStatuses() {
      return [
        { value: false, text: this.$t('TodoList.card.body.table.labelPending') },
        { value: true, text: this.$t('TodoList.card.body.table.labelCompleted') },
      ]
    },
  },
  methods: {
    updateOrCreate() {
      this.$emit('eventUpdateOrCreate', this)
      this.modal.status = false // Cerrar modal
    },
    // Ok modal
    async okModal() {
      // Check
      const validation = await this.$validator.validateAll()
      if (!validation) {
        this.$store.commit('setError', 'Faltan completar algunos campos')
        return
      }

      // Action submit
      this.clearAlertNotification()
      await this.updateOrCreate()
    },
  },
  destroyed() {
    this.clearAlertNotification()
    this.setLoadingButton(false)
  },
}
</script>

<style scoped></style>
