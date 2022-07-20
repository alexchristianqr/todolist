<template>
  <div class="container-lg overflow-hidden">
    <div class="py-3">
      <b-row>
        <b-col lg="10" md="10" cols="8" class="my-auto">
          <h1><span class="d-none d-md-inline">App </span>TodoList</h1>
        </b-col>
        <b-col lg="2" md="2" cols="4" class="my-auto text-right">
          <DropdownCountries :dropdown-params="country" class="mr-1" />
        </b-col>
      </b-row>
    </div>
    <TodoList />
    <MyFooter />
  </div>
</template>

<script>
import TodoList from '@/components/todolist'
import MyFooter from '@/components/common/MyFooter'
import DropdownCountries from '@/components/common/DropdownCountries'

export default {
  name: 'App',
  components: {
    DropdownCountries,
    MyFooter,
    TodoList,
  },
  data: () => ({
    country: { country: { id: 'PE', name: 'Perú', code: 'pe', flag: 'per.svg' } },
  }),
}
</script>

<style>
@import '../node_modules/vue-toast-notification/dist/theme-default.css';
</style>
