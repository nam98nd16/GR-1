<template>
  <a-spin :spinning="pageLoading">
    <div style="min-height: 100vh">
      <h1 style="text-align: center">Assessment History</h1>
      <a-table
        v-if="!pageLoading"
        :columns="columns"
        :dataSource="assessmentRecords"
        :pagination="pagination"
        :rowKey="(record, index) => index"
        @change="handleTableChange"
        bordered
      >
        <template
          slot="No"
          slot-scope="text, record, index"
        >{{(pagination.current - 1) * pagination.pageSize + index + 1}}</template>
        <template slot="evtName" slot-scope="text, record">{{record.evt.name}}</template>
        <template slot="startDate" slot-scope="text, record">{{record.evt.startDate}}</template>
        <template slot="endDate" slot-scope="text, record">{{record.evt.endDate}}</template>
        <template
          slot="status"
          slot-scope="text"
        >{{text ? text.charAt(0).toUpperCase() + text.slice(1, text.length) : "Draft"}}</template>
        <template slot="action" slot-scope="text, record">
          <a-button type="primary" @click="openHistoryPage(record)">View</a-button>
        </template>
      </a-table>
    </div>
  </a-spin>
</template>

<script>
import { columns } from "./const";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      columns,
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10
      },
      pageLoading: false,
      assessmentRecordsRef: null,
      assessmentRecords: []
    };
  },
  mounted() {
    this.getAllAssessmentRecords();
  },
  methods: {
    ...mapMutations({
      setCurrentAssessmentRecord: "history/setCurrentAssessmentRecord"
    }),
    async getAllAssessmentRecords() {
      this.pageLoading = true;
      this.assessmentRecordsRef = this.$fireStore.collection(
        "assessment_records"
      );
      let records = await this.assessmentRecordsRef
        .where("creatorId", "==", this.$fireAuth.currentUser.uid)
        .get();
      if (!records.empty) {
        records.forEach(record => {
          this.assessmentRecords.push(record.data());
        });
        let evtIds = this.assessmentRecords.map(
          record => record.assessmentEventId
        );
        let assessmentPeriodsRef = this.$fireStore.collection(
          "assessment_periods"
        );
        assessmentPeriodsRef
          .where("id", "in", evtIds)
          .get()
          .then(res => {
            res.forEach(evt => {
              this.assessmentRecords.find(
                record => record.assessmentEventId == evt.data().id
              ).evt = evt.data();
            });
            this.pageLoading = false;
          });
      } else {
        this.pageLoading = false;
      }
    },
    handleTableChange(pagination) {
      this.pagination = pagination;
    },
    openHistoryPage(record) {
      this.setCurrentAssessmentRecord(record);
      this.$router.push({
        name: "history-id",
        params: {
          id: record.id
        }
      });
    }
  }
};
</script>