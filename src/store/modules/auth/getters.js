export default {
  userIsLoggedIn: (state) => {
    return !!state.token;
  },
  userToken: (state) => {
    return state.token;
  },
  userData: (state) => {
    return state.user;
  },
  rewardsData: (state) => {
    return state.rewards;
  },
};
