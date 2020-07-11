<template>
  <a-spin :spinning="pageLoading">
    <div style="min-height: 100vh"></div>
  </a-spin>
</template>

<script>
export default {
  data() {
    return {
      pageLoading: false
    };
  }
};
</script>