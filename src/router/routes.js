import AuthRoutes from "modules/Auth/routes";
import HomeRoutes from "modules/Home/routes";

const routes = [
  ...AuthRoutes,
  ...HomeRoutes,
  {
    path: "/test",
    component: () => import("pages/Test.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
