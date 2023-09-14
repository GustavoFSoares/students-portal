export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  buildFeeds: async ({ commit }, feeds) => {
    try {
      const feedsData = feeds.map((feed) => ({
        title: feed.titulo,
        subtitle: feed.subtitulo,
        description: feed.descricao,
        image: feed.file.path,
        date: feed.updated_at,
        link: feed.link,
      }));

      console.log(feedsData);

      commit("SET_FEEDS", feedsData);
    } catch (err) {
      console.error("Feeds Data Error", err);
    }
  },
};
