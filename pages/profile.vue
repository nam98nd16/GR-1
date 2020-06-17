<template>
  <div class="container">
    <div v-if="user">
      <p>Full name: {{user.fullName}}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      user: null
    };
  },
  mounted() {
    if (this.currentUser) {
      var docRef = this.$fireStore
        .collection("users")
        .doc(this.currentUser.user_id);
      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            this.user = doc.data();
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.profile.currentUser
    })
  }
};
</script>

<style>
</style>
