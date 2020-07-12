<template>
  <AssessmentForm
    v-if="currentAssessmentRecord"
    :evtId="currentAssessmentRecord.assessmentEventId"
  />
</template>

<script>
import AssessmentForm from "@/components/AssessmentForm";
import { mapState } from "vuex";
export default {
  components: { AssessmentForm },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    ...mapState({
      currentAssessmentRecord: state => state["history"].currentAssessmentRecord
    })
  }
};
</script>