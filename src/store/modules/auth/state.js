import { LocalStorage } from "quasar";

export default {
  loading: false,
  user: null,
  rewards: {
    coins: 0,
    points: 0,
  },
  token: LocalStorage.getItem("avag-token"),
};
