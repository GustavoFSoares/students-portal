export default [
  {
    path: "insights",
    name: "home.insights",
    component: () => import("../pages/InsightsPage/index.vue"),
    meta: { mainPage: true },
    children: [
      {
        path: "ranking",
        meta: { mainPage: false },
        name: "home.insights.ranking",
        component: () => import("../pages/InsightsPage/InsightRankingPage.vue"),
      },
      {
        path: "conquest",
        meta: { mainPage: false },
        name: "home.insights.conquest",
        component: () =>
          import("../pages/InsightsPage/InsightConquestPage.vue"),
      },
      {
        path: "certificate",
        meta: { mainPage: false },
        name: "home.insights.certificates",
        component: () =>
          import("../pages/InsightsPage/InsightCertificatesPage.vue"),
      },
    ],
  },
];
