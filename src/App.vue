<script setup>
import { useRoute } from 'vue-router';
import DefaultLayout from './layouts/DefaultLayout.vue';
import BaseToast from './components/common/BaseToast.vue';
const route = useRoute();
</script>
<template>
  <RouterView v-if="route.meta.layout === 'standalone'" />
  <DefaultLayout v-else />
  <BaseToast />
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
</style>
