export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  buildMissions: async ({ commit }, missions) => {
    try {
      console.log(missions);
      // const feedsData = feeds.map((feed) => ({
      //   title: feed.titulo,
      //   subtitle: feed.subtitulo,
      //   description: feed.descricao,
      //   image: feed.file.path,
      //   date: feed.updated_at,
      //   link: feed.link,
      // }));
      // console.log(feedsData);
      // commit("SET_MISSIONS", feedsData);
    } catch (err) {
      console.error("Missions Data Error", err);
    }
  },
};
