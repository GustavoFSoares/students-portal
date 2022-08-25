export default [
  {
    path: "/",
    component: () => import("modules/Home/layouts/HomeLayout.vue"),
    name: "home",
    children: [
      // {
      //   path: "",
      //   name: "auth.login",
      //   component: () => import("modules/Auth/pages/LoginPage.vue"),
      // },
    ],
  },
];
