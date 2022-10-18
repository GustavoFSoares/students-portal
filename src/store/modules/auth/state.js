import { SessionStorage } from "quasar";

export default {
  loading: false,
  user: null,
  token: SessionStorage.getItem("avag-token"),
};
