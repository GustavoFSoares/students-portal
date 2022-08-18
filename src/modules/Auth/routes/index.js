export default [
  {
    path: "/login",
    component: () => import("modules/Auth/layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        name: "auth.login",
        component: () => import("modules/Auth/pages/LoginPage.vue"),
      },
    ],
  },
  {
    path: "/forgot",
    component: () => import("modules/Auth/layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        name: "auth.forgot",
        // component: () => import("modules/Auth/pages/LoginPage.vue"),
      },
    ],
  },
];
