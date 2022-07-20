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
                <b-button variant="primary" @click="showModal(0)">
                  <b-icon-plus class="mr-1" />
                  <span>{{ $t('TodoList.card.header.buttonCreate') }}</span>
                </b-button>
              </b-col>
            </b-row>
          </template>
          <b-table :items="tasks" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" responsive bordered striped hover>
            <template #cell(createdAt)="row">
              <div>{{ formatDate(row.item.createdAt, 'DD/MM/YYYY HH:mm:ss') }}</div>
            </template>
            <template #cell(expiredAt)="row">
              <div>{{ formatDate(new Date(row.item.expiredAt), 'DD/MM/YYYY HH:mm:ss') }}</div>
            </template>
            <template #cell(status)="row">
              <template v-if="row.item.status">
                <b-badge variant="success">Completed</b-badge>
              </template>
              <template v-else>
                <b-badge variant="warning">Pending</b-badge>
              </template>
            </template>
            <template #cell(actions)="row">
              <b-dropdown variant="light" toggle-class="text-decoration-none" no-caret>
                <template #button-content>
                  <b-icon-three-dots></b-icon-three-dots>
                </template>
                <b-dropdown-item href="#" @click="showModal(0, row.item, false)">
                  <b-icon-pencil class="mr-1"></b-icon-pencil>
                  <span>{{ $t('TodoList.card.body.table.actions.buttonUpdate') }}</span>
                </b-dropdown-item>
                <b-dropdown-item href="#" @click="deleteTask">
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
    <!-- The modal -->
    <ModalUpdateOrCreate v-if="modal[0].status" :modal="modal[0]" :modalParams="modalParams" @eventUpdateOrCreate="updateOrCreate" />
  </div>
</template>

<script>
import ModalUpdateOrCreate from '@/components/todolist/layouts/ModalUpdateOrCreate'
export default {
  name: 'TodoList',
  components: { ModalUpdateOrCreate },

  data() {
    return {
      modal: [
        {
          status: false,
          title: 'Nueva Tareas',
          oktitle: 'Aceptar',
          canceltitle: 'Cancelar',
          size: 'md',
          bodyclass: null,
          footerclass: 'justify-content-center',
          centered: false,
          hidefooter: false,
          esc: true,
          backdrop: true,
        },
      ],
      modalParams: null,
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
        { key: 'status', label: 'Status', sortable: true, tdClass: 'align-middle' },
        { key: 'actions', label: 'Actions', sortable: false, tdClass: 'align-middle' },
      ],
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks
    },
  },
  methods: {
    // Actualizar o crear tarea
    updateOrCreate() {
      if (this.modalParams.isPost) {
        this.createTask()
      } else {
        this.updateTask()
      }
    },
    // Crear tarea
    async createTask() {
      await this.$store.dispatch('Task.createTask', { self: this })
    },
    async updateTask() {
      await this.$store.dispatch('Task.createTask', { self: this })
    },
    // Eliminar tarea
    deleteTask() {
      this.messageBoxConfirm({
        message: `¿Esta seguro de eliminar el item?`,
      })
    },
    // Cambiar idioma
    changeLocale() {
      this.$i18n.locale = this.selectedLocale
    },
    // Mostrar modal
    showModal(index, values, isPost = true) {
      switch (index) {
        case 0:
          if (isPost) {
            this.modal[index].title = 'Crear Tarea'
            this.modal[index].oktitle = 'Guardar'
            this.modalParams = {
              title: null,
              description: null,
              createdAt: new Date(),
              expiredAt: null,
              status: false,
            }
          } else {
            this.modal[index].title = 'Editar Tarea'
            this.modal[index].oktitle = 'Actualizar'
            this.modalParams = this.cloneImmutable(values)
          }
          this.modalParams.isPost = isPost
          break
      }
      this.modal[index].status = true
    },
  },
}
</script>

<style scoped></style>
