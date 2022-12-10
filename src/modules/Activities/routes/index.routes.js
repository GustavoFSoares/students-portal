export default [
  {
    path: "/activities/:id",
    name: "activities.stage-list",
    component: () => import("../pages/StageListPage.vue"),
  },
  {
    path: "/activities/:id/stage/:stageId",
    name: "activities.stage",
    component: () => import("../pages/StagePage.vue"),
  },
];
