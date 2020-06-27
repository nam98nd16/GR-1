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
          <a-icon type="user" />
          {{getProfileName}}
        </nuxt-link>
      </a-menu-item>
      <a-menu-item @click="handleLogout" key="logout">
        <a-icon type="logout" />Log out
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      current: ["home"]
    };
  },
  methods: {
    ...mapMutations({
      setUpdatedFullName: "profile/setUpdatedFullName"
    }),
    handleLogout() {
      localStorage.clear();
      this.setUpdatedFullName("");
      this.$router.push("/login");
    }
  },
  computed: {
    ...mapState({
      updatedFullName: state => state["profile"].updatedFullName
    }),
    getProfileName() {
      let fullName = localStorage.getItem("fullName");
      return this.updatedFullName
        ? this.updatedFullName
        : fullName
        ? fullName
        : "Profile";
    }
  }
};
</script>