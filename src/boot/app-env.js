import { boot } from "quasar/wrappers";

const URL = process.env.BASE_URL;

export default boot(({ app }) => {
  app.config.globalProperties.$appPublic = `${URL}`;
  app.config.globalProperties.$appStorage = `${URL}/storage`;
  app.config.globalProperties.$iconsMap = {
    all: "fa-solid fa-house",
    folder: "fa-solid fa-folder",
    music: "fa-solid fa-music",
    document: "fa-solid fa-file",
    video: "fa-solid fa-video",
    link: "fa-solid fa-link",
  };
});
