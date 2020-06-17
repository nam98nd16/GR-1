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
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
            placeholder="Username"
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
          <a class="login-form-forgot" href>Forgot password</a>
          <a-button type="primary" html-type="submit" class="login-form-button">Log in</a-button>Or
          <a href>register now!</a>
        </a-form-item>
      </a-form>
    </div>
  </a-layout-content>
</template>

<script>
export default {
  layout: "login",
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.$router.push("/");
        }
      });
    }
  }
};
</script>

<style>
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