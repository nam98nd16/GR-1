<template>
  <div>
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="home">
        <nuxt-link :to="'/'">
          <a-icon type="home" />Home
        </nuxt-link>
      </a-menu-item>
      <a-menu-item key="profile">
        <nuxt-link :to="'/profile'">
          <a-icon type="user" />Profile
        </nuxt-link>
      </a-menu-item>
      <a-menu-item @click="handleLogout" key="logout">
        <a-icon type="logout" />Log out
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: ["home"]
    };
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    }
  }
};
</script>