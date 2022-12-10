import AuthRoutes from "modules/Auth/routes";
import HomeRoutes from "modules/Home/routes";
import ActivitiesRoutes from "modules/Activities/routes/index.routes";

const routes = [
  ...AuthRoutes,
  {
    path: "",
    name: "",
    component: () => import("layouts/CleanLayout.vue"),
    children: [...HomeRoutes, ...ActivitiesRoutes],
  },
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
