export const state = () => ({
  currentUser: null,
  updatedFullName: ""
});

export const mutations = {
  setCurrentUser(state, user) {
    state.currentUser = user;
  },
  setUpdatedFullName(state, fullName) {
    state.updatedFullName = fullName;
  }
};
