<template>
  <a-layout-content
    style="background: #fff; display: flex;justify-content: center;flex-direction: column; padding-bottom: 69px;"
  >
    <h1 style="text-align: center; font-size: 30px">Skill Assessment System</h1>
    <div id="components-form-demo-normal-login">
      <a-form :form="form" class="login-form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            v-decorator="[
          'userName',
          { rules: [{ required: true, message: 'Please input your email!' }] },
        ]"
            placeholder="Email"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <div v-if="errMessage">{{errMessage}}</div>
        <a-form-item>
          <a-checkbox
            v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
          >Remember me</a-checkbox>
          <nuxt-link :to="'/reset-password'">
            <a class="login-form-forgot">Forgot password</a>
          </nuxt-link>
          <a-button
            :loading="loading"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >Log in</a-button>Or
          <nuxt-link :to="'/register'">
            <a>register now!</a>
          </nuxt-link>
        </a-form-item>
      </a-form>
    </div>
  </a-layout-content>
</template>

<script>
import { mapMutations } from "vuex";
import jwt_decode from "jwt-decode";
export default {
  layout: "login",
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  data() {
    return {
      errMessage: "",
      loading: false
    };
  },
  methods: {
    ...mapMutations({
      setCurrentUser: "profile/setCurrentUser"
    }),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.loading = true;
          await this.$fireAuth
            .signInWithEmailAndPassword(values.userName, values.password)
            .then(data => {
              this.$fireAuth.currentUser.getIdToken(true).then(idToken => {
                localStorage.setItem("token", idToken);
                let docRef = this.$fireStore
                  .collection("users")
                  .doc(this.$fireAuth.currentUser.uid);
                docRef
                  .get()
                  .then(doc => {
                    if (doc.exists) {
                      let user = doc.data();
                      localStorage.setItem("fullName", user.fullName);
                      this.$router.push("/");
                    } else {
                      console.log("No such document!");
                    }
                  })
                  .catch(function(error) {
                    console.log("Error getting document:", error);
                  });
                //this.setCurrentUser(jwt_decode(idToken));
              });
            })
            .catch(err => {
              this.errMessage = err.message;
              setTimeout(() => (this.errMessage = ""), 3000);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>

<style scoped>
#components-form-demo-normal-login {
  align-items: center;
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
  margin: auto;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
  margin: auto;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
  margin: auto;
}
</style>