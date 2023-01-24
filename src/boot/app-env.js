import { boot } from "quasar/wrappers";
import { iconsMapReplations, iconsMap } from "maps/iconsMaps.json";

const URL = process.env.BASE_URL;

export default boot(({ app }) => {
  app.config.globalProperties.$appPublic = `${URL}`;
  app.config.globalProperties.$appStorage = `${URL}/storage`;
  app.config.globalProperties.$iconsMapReplations = iconsMapReplations;
  app.config.globalProperties.$iconsMap = iconsMap;
  app.config.globalProperties.$defaultActivityCover = "/default-trail.jpg";
});
