<template>
  <div>
    <div v-if="typeof alert == 'object'">
      <div class="fade-in text-left">
        <b-form-group>
          <b-alert show :variant="ASSETS.bg" class="mb-0">
            <div class="d-flex">
              <h5>{{ ASSETS.text }}</h5>
            </div>
            <div class="font-xs">
              <template v-if="typeof alert.content === 'object'">
                <ul class="font-weight-normal mb-0 font-xs pl-3">
                  <!--                  <template v-for="(v,k) in alert.content" : >-->
                  <li v-for="(v, k) in alert.content" :key="k"><span v-html="v"></span></li>
                  <!--                  </template>-->
                </ul>
              </template>
              <template v-else>
                <span v-html="alert.content"></span>
              </template>
            </div>
          </b-alert>
        </b-form-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    alert: null,
  },
  data: () => ({
    assets: [
      { name: 'success', bg: 'info', color: 'success', icon: 'cis-check-circle', text: 'Excelente' },
      { name: 'warning', bg: 'warning', color: 'danger', icon: 'cis-exclamation-circle', text: 'Advertencia' },
      { name: 'error', bg: 'danger', color: 'error', icon: 'cis-x-circle', text: 'Error' },
      { name: 'info', bg: 'info', color: 'error', icon: 'cis-exclamation-circle', text: 'Excelente' },
    ],
  }),
  computed: {
    ASSETS() {
      return this.assets.find((v) => v.name == this.alert.label)
    },
  },
}
</script>

<style scoped></style>
