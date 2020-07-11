<template>
  <a-spin :spinning="pageLoading">
    <div style="min-height: 100vh">
      <a-timeline>
        <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
        <a-timeline-item>Solve initial network problems 2015-09-01</a-timeline-item>
        <a-timeline-item>Technical testing 2015-09-01</a-timeline-item>
        <a-timeline-item>Network problems being solved 2015-09-01</a-timeline-item>
      </a-timeline>
    </div>
  </a-spin>
</template>

<script>
export default {
  data() {
    return {
      pageLoading: false,
      assessmentRecordsRef: null,
      assessmentRecords: []
    };
  },
  mounted() {
    this.getAllAssessmentRecords();
  },
  methods: {
    async getAllAssessmentRecords() {
      this.assessmentRecordsRef = this.$fireStore.collection(
        "assessment_records"
      );
      let records = await this.assessmentRecordsRef
        .where("creatorId", "==", this.$fireAuth.currentUser.uid)
        .get();
      if (!records.empty) {
        records.forEach(record => {
          console.log("record", record.data());
          this.assessmentRecords.push();
        });
      } else {
      }
    }
  }
};
</script>