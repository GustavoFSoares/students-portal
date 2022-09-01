export default [
  {
    path: "insights",
    name: "home.insights",
    component: import("../pages/InsightsPage/index.vue"),
  },
  {
    path: "insights/ranking",
    name: "home.insights.ranking",
    component: import("../pages/InsightsPage/InsightRankingPage.vue"),
  },
  {
    path: "insights/conquest",
    name: "home.insights.conquest",
    component: import("../pages/InsightsPage/InsightConquestPage.vue"),
  },
  {
    path: "insights/certificate",
    name: "home.insights.certificate",
    component: import("../pages/InsightsPage/InsightCertificatePage.vue"),
  },
];
