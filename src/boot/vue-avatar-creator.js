import { boot } from "quasar/wrappers";

import VueAvatarCreator from "vue-avatar-creator";

export default boot(({ app }) => {
  app.use(VueAvatarCreator);
});
