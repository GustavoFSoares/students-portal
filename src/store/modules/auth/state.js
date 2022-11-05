import { SessionStorage } from "quasar";

export default {
  loading: false,
  user: null,
  rewards: null,
  token: SessionStorage.getItem("avag-token"),
};
