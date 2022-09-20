import insightRoutes from "modules/Insights/routes";

export default [
  {
    path: "/",
    component: () => import("modules/Home/layouts/HomeLayout.vue"),
    name: "home",
    redirect: { name: "home.courses" },
    children: [
      ...insightRoutes,
      {
        path: "courses",
        name: "home.courses",
        component: () => import("../pages/CoursesPage.vue"),
      },
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
