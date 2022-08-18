export default [
  {
    path: "/login",
    component: () => import("modules/Auth/layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("modules/Auth/pages/LoginPage.vue"),
      },
    ],
  },
];
