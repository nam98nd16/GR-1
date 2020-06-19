<template>
  <div class="container">
    <a-form :form="form" class="login-form" @submit="handleSubmit">
      <a-form-item :label="'Email'" v-bind="formItemLayout">
        <a-input disabled :value="currentUser ? currentUser.email : ''" placeholder="Email">
          <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item :label="'Full name'" v-bind="formItemLayout">
        <a-input
          v-decorator="[
          'fullName',
          { rules: [{ required: true, message: 'Please input your full name!' }] },
        ]"
          placeholder="Full name"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item :label="'Phone number'" v-bind="formItemLayout">
        <a-input
          v-decorator="[
          'phoneNumber',
          { rules: [{ pattern: /^(0|[1-9][0-9]*)$/, message: 'Please input a valid phone number!' }] },
        ]"
          placeholder="Phone number"
        >
          <a-icon slot="prefix" type="mobile" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item :label="'Birthday'" v-bind="formItemLayout">
        <a-date-picker format="YYYY-MM-DD" v-decorator="['birthday']" />
      </a-form-item>
      <a-form-item :label="'  '" v-bind="formItemLayout" :colon="false">
        <a-button
          :loading="loading"
          type="primary"
          html-type="submit"
          class="login-form-button"
        >Update</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import jwt_decode from "jwt-decode";
export default {
  components: {},
  data() {
    return {
      formItemLayout: {
        labelCol: {
          md: 8,
          sm: 24
        },
        wrapperCol: {
          md: 16,
          sm: 24
        }
      },
      user: null,
      currentUser: null,
      loading: false
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "profile" });
  },
  mounted() {
    this.currentUser = jwt_decode(localStorage.getItem("token"));
    this.getProfile();
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.loading = true;
          this.$fireStore
            .collection("users")
            .doc(this.currentUser.user_id)
            .set({
              fullName: values.fullName,
              phoneNumber: values.phoneNumber,
              birthday: values.birthday
                ? this.$moment(values.birthday).format("YYYY-MM-DD")
                : ""
            })
            .then(() => {
              this.$notification.success({ message: "Update successfully!" });
            })
            .catch(error => {
              this.$notification.error({ message: error.message });
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    getProfile() {
      var docRef = this.$fireStore
        .collection("users")
        .doc(this.currentUser.user_id);
      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            this.user = doc.data();
            for (let field in this.user)
              this.form.setFieldsValue({
                [field]:
                  field == "birthday" &&
                  this.$moment(this.user[field]).isValid()
                    ? this.$moment(this.user[field])
                    : this.user[field]
              });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    }
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
