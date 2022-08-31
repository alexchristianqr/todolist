<template>
  <div>
    <b-card>
      <template #header>
        <b-row>
          <b-col cols="5" class="my-auto">
            <span class="h5">{{ $t('TodoList.card.header.title') }}</span>
          </b-col>
          <b-col cols="7" class="my-auto">
            <div class="d-inline-flex float-right">
              <b-button variant="primary" @click="showModal(0)" class="d-flex">
                <b-icon-plus class="mr-1" />
                <span class="text-truncate">{{ $t('TodoList.card.header.buttonCreate') }}</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </template>
      <!--          <pre>{{ tasks }}</pre>-->
      <b-table ref="table" :items="items" :fields="fields" :per-page="perPage" :current-page="currentPage" show-empty empty-text="No hay tareas registradas" responsive hover striped bordered>
        <template #head(updatedAt)="row">
          <div class="text-truncate">{{ row.label }}</div>
        </template>
        <template #cell(title)="row">
          <b-form-checkbox v-model="row.item.status" @input="checkedTask(row.item)">
            <template v-if="row.item.status">
              <del>{{ row.item.title }}</del>
            </template>
            <template v-else>
              <span>{{ row.item.title }}</span>
            </template>
          </b-form-checkbox>
        </template>
        <template #cell(description)="row">
          <div class="text-truncate" style="max-width: 400px">
            {{ row.item.description }}
          </div>
        </template>
        <template #cell(expiredAt)="row">
          <div>{{ formatDate(new Date(row.item.expiredAt), 'DD/MM/YYYY HH:mm:ss') }}</div>
        </template>
        <template #cell(updatedAt)="row">
          <div>{{ formatDate(row.item.updatedAt, 'DD/MM/YYYY HH:mm:ss') }}</div>
        </template>
        <template #cell(createdAt)="row">
          <div>{{ formatDate(row.item.createdAt, 'DD/MM/YYYY HH:mm:ss') }}</div>
        </template>
        <template #cell(status)="row">
          <b-badge v-if="row.item.status" variant="success">{{ $t('TodoList.card.body.table.labelCompleted') }}</b-badge>
          <b-badge v-else variant="warning">{{ $t('TodoList.card.body.table.labelPending') }}</b-badge>
        </template>
        <template #cell(actions)="row">
          <b-dropdown variant="light" toggle-class="text-decoration-none" no-caret :disabled="row.item.status">
            <template #button-content>
              <b-icon-three-dots></b-icon-three-dots>
            </template>
            <b-dropdown-item href="#" @click="showModal(0, row.item, false)">
              <b-icon-pencil class="mr-1"></b-icon-pencil>
              <span>{{ $t('TodoList.card.body.table.actions.buttonUpdate') }}</span>
            </b-dropdown-item>
            <b-dropdown-item href="#" @click="notifyDeleteTask(row.item)">
              <b-icon-trash class="mr-1"></b-icon-trash>
              <span>{{ $t('TodoList.card.body.table.actions.buttonDelete') }}</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
      <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"></b-pagination>
    </b-card>
    <!-- The modal -->
    <ModalUpdateOrCreate v-if="modal[0].status" :modal="modal[0]" :modalParams="modalParams" @eventUpdateOrCreate="updateOrCreate" />
  </div>
</template>

<script>
import ModalUpdateOrCreate from '@/components/todolist/layouts/ModalUpdateOrCreate'
export default {
  name: 'TodoList',
  components: { ModalUpdateOrCreate },
  data: () => ({
    perPage: 5,
    currentPage: 1,
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
    country: { country: { id: 'ES', name: 'España', code: 'es', flag: 'esp.svg' } },
    sortBy: 'updatedAt',
  }),
  computed: {
    items() {
      return this.$store.getters.tasks
    },
    fields() {
      return [
        {
          key: 'title',
          label: this.$t('TodoList.card.body.table.fields.title'),
          sortable: false,
          tdClass: 'align-middle text-truncate',
          stickyColumn: true,
        },
        {
          key: 'description',
          label: this.$t('TodoList.card.body.table.fields.description'),
          sortable: false,
          tdClass: 'align-middle w-50',
        },
        {
          key: 'expiredAt',
          label: this.$t('TodoList.card.body.table.fields.expiredAt'),
          sortable: true,
          tdClass: 'align-middle text-truncate',
        },
        {
          key: 'updatedAt',
          label: this.$t('TodoList.card.body.table.fields.updatedAt'),
          sortable: true,
          tdClass: 'align-middle text-truncate',
        },
        {
          key: 'createdAt',
          label: this.$t('TodoList.card.body.table.fields.createdAt'),
          sortable: true,
          tdClass: 'align-middle text-truncate',
        },
        {
          key: 'status',
          label: this.$t('TodoList.card.body.table.fields.status'),
          sortable: true,
          tdClass: 'align-middle text-truncate',
        },
        {
          key: 'actions',
          label: this.$t('TodoList.card.body.table.fields.actions'),
          sortable: false,
          tdClass: 'align-middle',
        },
      ]
    },
    rows() {
      return this.items.length
    },
  },
  async mounted() {
    await this.getTasks()
  },
  methods: {
    async getTasks() {
      await this.$store.dispatch('Task.getTasks', { self: this })
    },
    // Completar tarea
    async checkedTask(row) {
      this.modalParams = row
      this.modalParams.updatedAt = new Date()
      await this.$store.dispatch('Task.updateTask', { self: this, noToast: true })
    },
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
      const lengthTasks = this.items.length
      this.modalParams.id = lengthTasks + 1
      await this.$store.dispatch('Task.createTask', { self: this })
    },
    // Actualizar tarea
    async updateTask() {
      this.modalParams.updatedAt = new Date()
      await this.$store.dispatch('Task.updateTask', { self: this })
    },
    // Eliminar tarea
    async deleteTask(row) {
      this.modalParams = row
      this.modalParams.updatedAt = new Date()
      await this.$store.dispatch('Task.removeTask', { self: this })
    },
    // Alerta modal notificación
    notifyDeleteTask(row) {
      this.messageBoxConfirm({
        message: this.$t('TodoList.card.body.table.labelNotifyDeleteTask'),
      }).then(async (value) => {
        if (!value) return
        await this.deleteTask(row)
      })
    },
    // Mostrar modal
    showModal(index, values = null, isPost = true) {
      switch (index) {
        case 0:
          if (isPost) {
            this.modal[index].title = 'Crear Tarea'
            this.modal[index].oktitle = 'Guardar'
            this.modalParams = {
              id: null,
              title: null,
              description: null,
              expiredAt: new Date(),
              updatedAt: new Date(),
              createdAt: new Date(),
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
