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
    @ok="updateOrCreate"
  >
    <!--    <pre>{{ modalParams }}</pre>-->
    <b-form ref="form">
      <b-form-group :label="$t('ModalUpdateOrCreate.form.title')">
        <b-form-input v-model="modalParams.title"></b-form-input>
      </b-form-group>
      <b-form-group :label="$t('ModalUpdateOrCreate.form.description')">
        <b-form-textarea v-model="modalParams.description"></b-form-textarea>
      </b-form-group>
      <b-form-group :label="$t('ModalUpdateOrCreate.form.expireDate')">
        <b-form-datepicker v-model="modalParams.expiredAt"></b-form-datepicker>
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
  data: () => ({}),
  computed: {
    loadingButton() {
      return false
    },
  },
  methods: {
    updateOrCreate() {
      return this.$emit('eventUpdateOrCreate', this)
    },
  },
}
</script>

<style scoped></style>
