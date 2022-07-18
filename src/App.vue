<template>
  <div id="app" class="container py-lg-3">
    <div class="py-3">
      <h1>App TodoList</h1>
    </div>
    <TodoList />
    <MyFooter/>
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

<style lang="scss">
@import './node_modules/bootstrap/scss/bootstrap.scss';
</style>
