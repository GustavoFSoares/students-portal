export default [
  {
    component: () => import("layouts/CleanLayout.vue"),
    children: [
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
    ],
  },
];
