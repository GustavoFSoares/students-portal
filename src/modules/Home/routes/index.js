import insightHomeSubpagesRoutes from "modules/Insights/routes/homeSubpages.routes";
// import coursesHomeSubpagesRoutes from "modules/Courses/routes/homeSubpages.routes";
// import feedHomeSubpagesRoutes from "modules/Feed/routes/homeSubpages.routes";
import libraryHomeSubpagesRoutes from "modules/Library/routes/homeSubpages.routes";
// import eventsHomeSubpagesRoutes from "modules/Events/routes/homeSubpages.routes";
// import missionsHomeSubpagesRoutes from "modules/Missions/routes/homeSubpages.routes";
import rankingHomeSubpagesRoutes from "modules/Ranking/routes/homeSubpages.routes";
import activitiesHomeSubpagesRoutes from "modules/Activities/routes/homeSubpages.routes";
import achievementsHomeSubpagesRoutes from "modules/Achievements/routes/homeSubpages.routes";
import certificatesHomeSubpagesRoutes from "modules/Certificates/routes/homeSubpages.routes";
import userHomeSubpagesRoutes from "modules/User/routes/homeSubpages.routes";

export default [
  {
    path: "/",
    component: () => import("layouts/DefaultLayout.vue"),
    name: "home",
    redirect: { name: "home.activities" },
    children: [
      ...insightHomeSubpagesRoutes,
      ...rankingHomeSubpagesRoutes,
      ...activitiesHomeSubpagesRoutes,
      ...achievementsHomeSubpagesRoutes,
      ...certificatesHomeSubpagesRoutes,
      ...userHomeSubpagesRoutes,
      // ...coursesHomeSubpagesRoutes,
      // ...feedHomeSubpagesRoutes,
      ...libraryHomeSubpagesRoutes,
      // ...eventsHomeSubpagesRoutes,
      // ...missionsHomeSubpagesRoutes,
    ],
  },
];
