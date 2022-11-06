import { LocalStorage } from "quasar";

export default {
  loading: false,
  user: null,
  rewards: null,
  token: LocalStorage.getItem("avag-token"),
};
