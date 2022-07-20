<template>
  <div class="container overflow-hidden">
    <div class="py-3">
      <h1>App TodoList</h1>
    </div>
    <TodoList />
    <MyFooter />
  </div>
</template>

<script>
import TodoList from '@/components/todolist'
import MyFooter from '@/components/common/MyFooter'

export default {
  name: 'App',
  components: {
    MyFooter,
    TodoList,
  },
}
</script>

<style>
@import '../node_modules/vue-toast-notification/dist/theme-default.css';
</style>
