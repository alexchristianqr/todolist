<template>
  <b-form-group class="pt-lg-0 pt-3">
    <div>
      <span class="mr-1">{{ $t('TodoList.footer.a') }}</span>
      <span>{{ $t('TodoList.footer.b') }} </span>
      <b-link target="_blank" href="https://github.com/alexchristianqr">@alexchristianqr </b-link>
      <span>{{ $t('TodoList.footer.c') }} </span>
      <span class="text-danger">&hearts;</span>
    </div>
  </b-form-group>
</template>

<script>
export default {
  name: 'MyFooter',
}
</script>

<style scoped></style>
