export default [
  {
    path: "/courses/:id",
    name: "courses.stages-list",
    component: () => import("../pages/StagesListPage.vue"),
  },
  {
    path: "/courses/:id/stage/:stageId",
    name: "courses.stage",
    component: () => import("../pages/StagePage.vue"),
  },
];
