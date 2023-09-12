import { store } from "quasar/wrappers";
import { createStore } from "vuex";

import AuthModule from "./modules/auth";
// import CourseModule from "./modules/courses";
import RankingModule from "./modules/ranking";
// import ConquestsModule from "./modules/conquests";
import ActivitiesModule from "./modules/activities";
import AchievementsModule from "./modules/achievements";
import CertificatesModule from "./modules/certificates";
import LibraryModule from "./modules/library";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      AuthModule,
      // CourseModule,
      RankingModule,
      // ConquestsModule,
      ActivitiesModule,
      AchievementsModule,
      CertificatesModule,
      LibraryModule,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
