import axios from "axios";

import { boot } from "quasar/wrappers";
import { SessionStorage } from "quasar";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const URL = process.env.BASE_URL;
const api = axios.create({
  baseURL: `${URL}/api/v1/`,
});

export default boot(({ app }) => {
  api.interceptors.request.use((config) => {
    const token = SessionStorage.getItem("avag-token");
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
