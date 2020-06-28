<template>
  <a-spin :spinning="pageLoading">
    <div class="container">
      <h1 style="text-align: center">Assessment Events</h1>
      <a-table
        :columns="columns"
        :dataSource="assessmentPeriods"
        :pagination="pagination"
        :rowKey="(record, index) => index"
        @change="handleTableChange"
        bordered
      >
        <template
          slot="No"
          slot-scope="text, record, index"
        >{{(pagination.current - 1) * pagination.pageSize + index + 1}}</template>
        <template slot="skillCount" slot-scope="text">{{text.length}}</template>
        <template slot="action" slot-scope="text, record">
          <a-button type="primary" @click="openAssessPage(record)">Assess</a-button>
        </template>
      </a-table>
    </div>
  </a-spin>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { columns } from "./const";
import jwt_decode from "jwt-decode";
export default {
  components: {},
  data() {
    return {
      columns,
      pageLoading: false,
      assessmentPeriods: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10
      }
    };
  },
  beforeCreate() {},
  mounted() {
    this.getAssessmentPeriods();
  },
  methods: {
    getAssessmentPeriods() {
      this.pageLoading = true;
      var colRef = this.$fireStore.collection("assessment_periods");
      colRef
        .get()
        .then(col => {
          col.forEach(doc => {
            this.assessmentPeriods.push({ ...doc.data(), id: doc.id });
          });
        })
        .catch(function(error) {
          console.log("Error getting collection:", error);
        })
        .finally(() => {
          this.pageLoading = false;
        });
    },
    handleTableChange(pagination, filters, sorter) {
      this.pagination = pagination;
    },
    openAssessPage(assessmentEvent) {
      this.$router.push({
        name: "assess",
        params: {
          evt: assessmentEvent
        }
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
