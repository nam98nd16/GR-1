<template>
  <a-spin :spinning="pageLoading">
    <div class="container">
      <a-form style="margin-top: 50px" :form="form" class="login-form" @submit="handleSubmit">
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
        <a-form-item :label="'Gender'" v-bind="formItemLayout">
          <a-radio-group name="gender" v-decorator="['gender', {initialValue:1}]">
            <a-radio :value="1">Male</a-radio>
            <a-radio :value="2">Female</a-radio>
            <a-radio :value="3">Other</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item :label="'About me'" v-bind="formItemLayout">
          <a-textarea v-decorator="['about']" :autosize="{ minRows: 2, maxRows: 10 }"></a-textarea>
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
  </a-spin>
</template>

<script>
import { mapState, mapMutations } from "vuex";
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
          md: 8,
          sm: 24
        }
      },
      user: null,
      currentUser: null,
      loading: false,
      pageLoading: false
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
    ...mapMutations({
      setUpdatedFullName: "profile/setUpdatedFullName"
    }),
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
              phoneNumber: values.phoneNumber ? values.phoneNumber : "",
              birthday: values.birthday
                ? this.$moment(values.birthday).format("YYYY-MM-DD")
                : "",
              gender: values.gender,
              about: values.about ? values.about : ""
            })
            .then(() => {
              this.$notification.success({ message: "Update successfully!" });
              this.setUpdatedFullName(values.fullName);
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
      this.pageLoading = true;
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
        })
        .finally(() => {
          this.pageLoading = false;
        });
    }
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
