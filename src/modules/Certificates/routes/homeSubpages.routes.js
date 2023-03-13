export default [
  {
    path: "certificates",
    name: "home.certificates",
    component: () => import("../pages/index.vue"),
  },
  {
    path: "certificates/:id",
    name: "home.certificate-item",
    component: () => import("../pages/CertificateItem.vue"),
  },
];
