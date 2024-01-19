export default [
  {
    path: "/trilha/:id",
    name: "activities.stage-list",
    component: () => import("../pages/StageListPage.vue"),
  },
  {
    path: "/trilha/:id/atividade/:stageId",
    name: "activities.stage",
    component: () => import("../pages/StagePage.vue"),
  },
];
