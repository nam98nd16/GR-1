export const state = () => ({
  currentAssessmentRecord: null
});

export const mutations = {
  setCurrentAssessmentRecord(state, record) {
    state.currentAssessmentRecord = record;
  }
};
