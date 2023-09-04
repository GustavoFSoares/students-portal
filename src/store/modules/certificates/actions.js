import { api } from "boot/axios";

export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  loadCertificates: async ({ commit, rootGetters }) => {
    try {
      const { studentId } = rootGetters["AuthModule/userData"];

      const {
        data: { data },
      } = await api.post("alunos/buscar-certificados", { aluno_id: studentId });

      const preparedSertificates = data.map((certificate) => {
        return {
          id: certificate.id,
          title: certificate.titulo,
          description: certificate.conteudo,
          conclusionDate: new Date(certificate.updated_at),
        };
      });

      commit("SET_CERTIFICATES", preparedSertificates);

      return preparedSertificates;
    } catch (err) {
      console.error("Courses Data Error", err);
    }
  },
  getCertificate: async ({ state, dispatch }, id) => {
    if (!state.certificates) {
      await dispatch("loadCertificates");
    }

    const certificate = state.certificates.find(
      (certificate) => certificate.id === Number(id)
    );

    return certificate || null;
  },
};
