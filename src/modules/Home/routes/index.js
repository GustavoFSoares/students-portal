import insightHomeSubpagesRoutes from "src/modules/Insights/routes/homeSubpages.routes";
import coursesHomeSubpagesRoutes from "src/modules/Courses/routes/homeSubpages.routes";

export default [
  {
    path: "/",
    component: () => import("modules/Home/layouts/HomeLayout.vue"),
    name: "home",
    redirect: { name: "home.courses" },
    children: [
      ...insightHomeSubpagesRoutes,
      ...coursesHomeSubpagesRoutes,
      {
        path: "feed",
        name: "home.feed",
        component: () => import("../pages/FeedPage.vue"),
      },
      {
        path: "library",
        name: "home.library",
        component: () => import("../pages/LibraryPage.vue"),
      },
      {
        path: "events",
        name: "home.events",
        component: () => import("../pages/EventsPage.vue"),
      },
      {
        path: "missions",
        name: "home.missions",
        component: () => import("../pages/MissionsPage.vue"),
      },
    ],
  },
];
