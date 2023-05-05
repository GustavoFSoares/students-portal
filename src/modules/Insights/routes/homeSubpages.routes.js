export default [
  {
    path: "insights",
    name: "home.insights",
    component: () => import("../pages/index.vue"),
    meta: { mainPage: true },
    children: [
      {
        path: "ranking",
        meta: { mainPage: false },
        name: "home.insights.ranking",
        component: () => import("../pages/RankingPage.vue"),
      },
      {
        path: "conquest",
        meta: { mainPage: false },
        name: "home.insights.conquest",
        component: () => import("../pages/ConquestPage.vue"),
      },
      {
        path: "certificate",
        meta: { mainPage: false },
        name: "home.insights.certificates",
        component: () => import("../pages/AchievementsPage.vue"),
      },
    ],
  },
];
