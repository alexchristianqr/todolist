<template>
  <div>
    <b-form>
      <b-form-group>
        <b-card>
          <template #header>
            <b-row>
              <b-col class="my-auto">
                <span class="h5">{{ $t('TodoList.card.header.title') }}</span>
              </b-col>
              <b-col cols="6" class="text-right">
                <b-form-select v-model="selectedLocale" :options="optionsLocales" @change="changeLocale" class="w-25 mr-1">
                  <template #first>
                    <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
                  </template>
                </b-form-select>
                <b-button variant="secondary" class="mr-1">
                  <b-icon-gear-fill class="mr-1" />
                  <span>{{ $t('TodoList.card.header.buttonSettings') }}</span>
                </b-button>
                <b-button variant="primary">
                  <b-icon-plus class="mr-1" />
                  <span>{{ $t('TodoList.card.header.buttonCreate') }}</span>
                </b-button>
              </b-col>
            </b-row>
          </template>
          <b-table :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" responsive bordered striped hover>
            <template #cell(actions)="row">
              <b-dropdown variant="light" toggle-class="text-decoration-none" no-caret>
                <template #button-content>
                  <b-icon-three-dots></b-icon-three-dots>
                </template>
                <b-dropdown-item href="#" @click="row.toggleDetails">
                  <b-icon-pencil class="mr-1"></b-icon-pencil>
                  <span>{{ $t('TodoList.card.body.table.actions.buttonUpdate') }}</span>
                </b-dropdown-item>
                <b-dropdown-item href="#">
                  <b-icon-trash class="mr-1"></b-icon-trash>
                  <span>{{ $t('TodoList.card.body.table.actions.buttonDelete') }}</span>
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </b-table>
          <div>
            <span>Sorting By: </span>
            <b>{{ sortBy }}</b>
            <span>, Sort Direction:</span>
            <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
          </div>
        </b-card>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data() {
    return {
      selectedLocale: 'es',
      optionsLocales: [
        { value: 'en', text: 'English' },
        { value: 'es', text: 'Español' },
        { value: 'fr', text: 'Frances' },
      ],
      sortBy: 'age',
      sortDesc: false,
      fields: [
        { key: 'title', label: 'Title', sortable: true, tdClass: 'align-middle' },
        { key: 'description', label: 'Description', sortable: true, tdClass: 'align-middle' },
        { key: 'createdAt', label: 'Create Date', sortable: true, tdClass: 'align-middle' },
        { key: 'expiredAt', label: 'Expire Date', sortable: true, tdClass: 'align-middle' },
        { key: 'isActive', label: 'Active', sortable: true, tdClass: 'align-middle' },
        { key: 'actions', label: 'Actions', sortable: false, tdClass: 'align-middle' },
      ],
      items: [
        {
          title: 'Titulo',
          description: 'Descripcion',
          createdAt: 'Fecha creado',
          expiredAt: 'Fecha expirado',
          isActive: true,
        },
        {
          title: 'Titulo',
          description: 'Descripcion',
          createdAt: 'Fecha creado',
          expiredAt: 'Fecha expirado',
          isActive: true,
        },
        {
          title: 'Titulo',
          description: 'Descripcion',
          createdAt: 'Fecha creado',
          expiredAt: 'Fecha expirado',
          isActive: true,
        },
      ],
    }
  },
  computed: {
    // availableLocales() {
    //   return this.$i18n.locales =
    // },
    currentLocale() {
      return this.$i18n.locales.find((item) => item.code.toString() === this.$i18n.locale.toString())
    },
    availableCurrencys() {
      return this.$i18n.locales.map((item) => item.currency)
    },
    currentCurrency() {
      const locale = this.$i18n.locales.find((item) => item.code.toString() === this.$i18n.locale.toString())
      return locale.currency
    },
  },
  methods: {
    changeLocale() {
      this.$i18n.locale = this.selectedLocale
    },
  },
}
</script>

<style scoped></style>
