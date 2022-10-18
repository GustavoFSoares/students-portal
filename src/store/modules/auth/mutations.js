export default {
  SET_LOADING(state, isLoading) {
    state.loading = isLoading;
  },
  SET_LOGGED_IN(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  },
  SET_USER(state, user) {
    state.user = {
      id: user.id,
      cpf: user.cpf,
      email: user.email,
      name: user.nome,
    };
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
};
