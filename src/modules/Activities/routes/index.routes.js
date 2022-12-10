export default [
  {
    path: "/activities/:id",
    component: () => import("layouts/CleanLayout.vue"),
    children: [
      {
        path: "",
        name: "activities.stages-list",
        component: () => import("../pages/StageListPage.vue"),
      },
    ],
  },
];
