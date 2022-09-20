import insightHomeSubpagesRoutes from "modules/Insights/routes/homeSubpages.routes";
import coursesHomeSubpagesRoutes from "modules/Courses/routes/homeSubpages.routes";
import feedHomeSubpagesRoutes from "modules/Feed/routes/homeSubpages.routes";
import libraryHomeSubpagesRoutes from "modules/Library/routes/homeSubpages.routes";
import eventsHomeSubpagesRoutes from "modules/Events/routes/homeSubpages.routes";
import missionsHomeSubpagesRoutes from "modules/Missions/routes/homeSubpages.routes";

export default [
  {
    path: "/",
    component: () => import("modules/Home/layouts/HomeLayout.vue"),
    name: "home",
    redirect: { name: "home.courses" },
    children: [
      ...insightHomeSubpagesRoutes,
      ...coursesHomeSubpagesRoutes,
      ...feedHomeSubpagesRoutes,
      ...libraryHomeSubpagesRoutes,
      ...eventsHomeSubpagesRoutes,
      ...missionsHomeSubpagesRoutes,
    ],
  },
];
