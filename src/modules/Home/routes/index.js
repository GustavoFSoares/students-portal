// import insightHomeSubpagesRoutes from "modules/Insights/routes/homeSubpages.routes";
// import coursesHomeSubpagesRoutes from "modules/Courses/routes/homeSubpages.routes";
// import feedHomeSubpagesRoutes from "modules/Feed/routes/homeSubpages.routes";
// import libraryHomeSubpagesRoutes from "modules/Library/routes/homeSubpages.routes";
// import eventsHomeSubpagesRoutes from "modules/Events/routes/homeSubpages.routes";
// import missionsHomeSubpagesRoutes from "modules/Missions/routes/homeSubpages.routes";
import achievementsHomeSubpagesRoutes from "modules/Achievements/routes/homeSubpages.routes";
import activitiesHomeSubpagesRoutes from "modules/Activities/routes/homeSubpages.routes";
import rankingHomeSubpagesRoutes from "modules/Ranking/routes/homeSubpages.routes";

export default [
  {
    path: "/",
    component: () => import("modules/Home/layouts/HomeLayout.vue"),
    name: "home",
    redirect: { name: "home.activities" },
    children: [
      ...achievementsHomeSubpagesRoutes,
      ...activitiesHomeSubpagesRoutes,
      ...rankingHomeSubpagesRoutes,
      // ...insightHomeSubpagesRoutes,
      // ...coursesHomeSubpagesRoutes,
      // ...feedHomeSubpagesRoutes,
      // ...libraryHomeSubpagesRoutes,
      // ...eventsHomeSubpagesRoutes,
      // ...missionsHomeSubpagesRoutes,
    ],
  },
];
