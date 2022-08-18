export default ([to, from, next], $store) => {
  const userIsLoggedIn = $store.getters["AuthModule/userIsLoggedIn"];
  if (!/auth/.test(to.name) && !userIsLoggedIn) {
    next({ name: "auth.login" });
    return;
  }

  return next();
};
