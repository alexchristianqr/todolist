<template>
  <div id="app" class="container py-lg-3">
    <b-form-group class="pt-lg-0 pt-3">
      <div class="img-thumbnail text-center">
        <img alt="Vue logo" src="./assets/logo.png" />
      </div>
    </b-form-group>
    <TodoList />
  </div>
</template>

<script>
import TodoList from '@/components/todolist'

export default {
  name: 'App',
  components: {
    TodoList,
  },
}
</script>

<style lang="scss">
@import './node_modules/bootstrap/scss/bootstrap.scss';
</style>
