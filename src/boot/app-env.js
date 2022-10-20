import { boot } from "quasar/wrappers";

const URL = process.env.BASE_URL;

export default boot(({ app }) => {
  app.config.globalProperties.$appPublic = `${URL}`;
  app.config.globalProperties.$appStorage = `${URL}/storage`;
});
