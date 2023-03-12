import { boot } from "quasar/wrappers";

export default boot(({ app }) => {
  app.config.globalProperties.$filters = {
    ...app.config.globalProperties.$filters,
    dateFormatFullDate: (date) => {
      return new Date(date).toLocaleString().replace(", ", " - ");
    },
    dateFormat: (date) => {
      return new Date(date).toLocaleDateString();
    },
  };
});
