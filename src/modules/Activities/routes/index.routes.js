export default [
  {
    path: "/activities/:id",
    name: "activities.stages-list",
    component: () => import("layouts/CleanLayout.vue"),
    children: [
      {
        path: "",
        name: "activities.stage",
        component: () => import("../pages/StagesListPage.vue"),
      },
    ],
  },
];
