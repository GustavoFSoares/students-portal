export default [
  {
    path: "/courses/:id",
    name: "courses.stages-list",
    component: () => import("../pages/StagesListPage.vue"),
  },
];
