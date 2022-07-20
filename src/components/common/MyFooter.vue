<template>
  <b-form-group class="pt-lg-0 pt-3">
    <div class="  ">
      <span class="mr-1">{{ $t('TodoList.footer.a') }}</span>
      <img src="@/assets/logo.png" :width="18" class="mr-1" alt="Vuejs" title="Vuejs" />
      <span
        >{{ $t('TodoList.footer.b') }} <b-link target="_blank" href="https://github.com/alexchristianqr">@alexchristianqr</b-link> {{ $t('TodoList.footer.c') }}
        <span class="text-danger" style="font-size: 18px">&hearts;</span></span
      >
    </div>
  </b-form-group>
</template>

<script>
export default {
  name: 'MyFooter',
}
</script>

<style scoped></style>
