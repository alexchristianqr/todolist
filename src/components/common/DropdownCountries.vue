<template>
  <b-dropdown variant="light" :dropleft="true" :disabled="dropdpownDisabled">
    <template #button-content>
      <div class="w-100 d-inline-flex my-auto">
        <template v-if="selected">
          <div class="ml-1">
            <img :src="require(`../../assets/images/svg/countries/${selected.flag}`)" width="32" class="mr-1" />
            <!--            <div>{{ `${selected.id}(${selected.code})` }}</div>-->
          </div>
          <!--          <div class="float-right">-->
          <!--            <i class="cis-caret-bottom"></i>-->
          <!--          </div>-->
        </template>
        <template v-else>
          <div class="float-left d-flex">
            <div>- Seleccionar -</div>
          </div>
          <div class="float-right">
            <i class="cis-caret-bottom"></i>
          </div>
        </template>
      </div>
    </template>
    <template #default>
      <b-dropdown-item v-for="v in dataCountries" @click="changeCountry(v)" :key="v.id">
        <div>
          <img :src="require(`../../assets/images/svg/countries/${v.flag}`)" width="24" class="mr-2" />
          <span>{{ v.name }}</span>
        </div>
      </b-dropdown-item>
    </template>
  </b-dropdown>
</template>

<script>
/**
 * Link de la documentación de la API REST Countries v3
 * https://restcountries.com/
 * https://restcountries.com/v3.1/alpha/${country}
 * https://flagcdn.com/${country}.svg
 */
export default {
  name: 'DropdownCountries',
  props: {
    dropdownParams: {
      type: Object,
    },
    dropdpownDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    selected: null,
    dataCountries: [
      { id: 'PE', name: 'Perú', code: 'pe', flag: 'per.svg' },
      { id: 'US', name: 'Estados Unidos', code: 'en', flag: 'usa.svg' },
      { id: 'ES', name: 'España', code: 'es', flag: 'esp.svg' },
    ],
  }),
  mounted() {
    if (!this.dropdownParams?.country) return
    this.selected = this.dropdownParams.country
  },
  methods: {
    // Cambiar pais con idioma
    changeCountry(v) {
      this.selected = v
      this.dropdownParams.country = this.selected
      this.$i18n.locale = this.selected.code
    },
  },
}
</script>

<style scoped lang="scss"></style>
