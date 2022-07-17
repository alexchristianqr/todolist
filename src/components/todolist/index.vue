<template>
  <div>
    <b-form>
<!--      <b-form-group>-->
<!--        <h2>Lista de tareas</h2>-->
<!--      </b-form-group>-->
      <b-form-group>
        <b-card>
          <template #header>
            <b-row>
              <b-col class="my-auto">
                <span class="h2">{{$t('TodoList.title')}}</span>
              </b-col>
              <b-col class="text-right">
                <b-button variant="secondary" >  <b-icon-gear-fill /> Settings</b-button>
              </b-col>
            </b-row>
          </template>
<!--          <b-card-header>-->
<!--          </b-card-header>-->
<!--          <b-card-body>-->
            <b-table
                :items="items"
                :fields="fields"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                responsive="sm"
            ></b-table>
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
      sortBy: 'age',
      sortDesc: false,
      fields: [
        { key: 'title',label:"Title", sortable: true },
        { key: 'first_name', sortable: true },
        { key: 'age', sortable: true },
        { key: 'isActive', sortable: false },
      ],
      items: [
        {
          isActive: true,
          age: 40,
          first_name: 'Dickerson',
          last_name: 'Macdonald',
        },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
      ],
    }
  },
}
</script>

<style scoped></style>
