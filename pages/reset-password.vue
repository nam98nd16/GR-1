<template>
  <a-layout-content
    style="background: #fff; display: flex;justify-content: center;flex-direction: column; padding-bottom: 69px;"
  >
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
        <div v-if="errMessage">{{errMessage}}</div>
        <a-form-item>
          <a-button
            :loading="loading"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >Reset password</a-button>
          <nuxt-link to="/login">
            <a>Back to login page</a>
          </nuxt-link>
        </a-form-item>
      </a-form>
    </div>
  </a-layout-content>
</template>

<script>
export default {
  layout: "login",
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "reset-password" });
  },
  data() {
    return {
      errMessage: "",
      loading: false
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.loading = true;
          this.$fireAuth
            .sendPasswordResetEmail(values.userName)
            .then(() => {
              // Email sent.
              this.$notification.success({
                message:
                  "An email has been sent. Please follow the email's instructions to reset your password."
              });
            })
            .catch(error => {
              // An error happened.
              this.errMessage = error.message;
              setTimeout(() => (this.errMessage = ""), 3000);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    handleError(e) {
      this.errMessage = e;
      setTimeout(() => (this.errMessage = ""), 3000);
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