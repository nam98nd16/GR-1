<template>
  <a-layout style="min-height: 100vh">
    <nuxt />
  </a-layout>
</template>
<script>
export default {
  middleware: "loginGuard"
};
</script>