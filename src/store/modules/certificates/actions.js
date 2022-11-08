import { api } from "boot/axios";

export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  loadCertificates: async ({ commit }) => {
    try {
      const {
        data: { data },
      } = await api.post("alunos/buscar-certificados");

      const preparedSertificates = data.map((certificate) => ({
        id: certificate.certificado_trilha.certificado.id,
        name: certificate.certificado_trilha.certificado.titulo,
        description: certificate.certificado_trilha.certificado.conteudo,
        trailId: certificate.certificado_trilha.trilha_id,
        path: certificate.certificado_trilha.trilha.capa
          ? certificate.certificado_trilha.trilha.capa.path
          : undefined,
        completedDate: new Date(certificate.certificado_trilha.updated_at),
      }));

      commit("SET_CERTIFICATES", preparedSertificates);

      return preparedSertificates;
    } catch (err) {
      console.error("Courses Data Error", err);
    }
  },
};
