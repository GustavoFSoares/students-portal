<template>
  <AvPage
    class="certificate-item"
    :title="$t(`${I18N_PATH}.title`)"
    :go-back-route="{ name: 'home.certificates' }"
  >
    <div class="certificate__wrapper">
      <div class="certificate">
        <img
          src="~/assets/img/certificates/certificate-border.jpg"
          alt="certificates model"
        />

        <div class="certificate__content" v-if="certificateData">
          <h1 class="certificate__title">Certificado de Conclusão</h1>

          <p class="certificate__name-label">certificamos que</p>

          <p class="certificate__name">{{ userName }}</p>

          <div class="certificate-description">
            <p class="certificate-description__label">adquiriu a conquista</p>

            <p class="certificate-description__name">
              {{ certificateData.name }}
            </p>

            <p class="certificate-description__description">
              {{ certificateData.description }}
            </p>

            <p class="certificate-description__date">
              {{ $filters.dateFormat(certificateData.conclusionDate) }}
            </p>
          </div>

          <div class="certificate-conclusion">
            <p class="certificate-conclusion__label">
              obtido por concluir a atividade
            </p>

            <p
              class="certificate-conclusion__name"
              v-if="certificateData.activity?.name"
            >
              {{ certificateData.activity.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </AvPage>
</template>

<script setup>
const I18N_PATH = "modules.certificates";

import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import AvPage from "organisms/AvPage.vue";

const $store = useStore();
const $route = useRoute();

const certificateData = ref({});
const userName = computed(() => $store.getters["AuthModule/userData"]?.name);

onMounted(async () => {
  certificateData.value = await $store.dispatch(
    "CertificatesModule/getCertificate",
    $route.params.id
  );
});
</script>

<style lang="scss" scoped>
.certificate-item {
  .certificate {
    width: 100%;
    max-width: 900px;
    border-radius: 8px;
    overflow: hidden;

    position: relative;

    &__wrapper {
      display: flex;
      justify-content: center;
      align-content: center;
    }

    img {
      width: 100%;
    }

    &__content {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      padding: 6%;

      text-align: center;
    }

    &__title {
      margin-top: 5%;
      font-size: 240%;
      font-weight: 800;
    }

    &__name-label {
      margin-top: 7%;
      font-size: 160%;
    }

    &__name {
      margin-top: 1%;
      font-size: 300%;
      text-transform: uppercase;
    }

    .certificate-description {
      margin-top: 8%;
      padding: 0 50px;

      &__label {
        font-size: 130%;
      }

      &__name {
        margin-top: 1%;
        font-size: 160%;
        font-weight: 600;
        text-transform: uppercase;
      }

      &__description {
        font-size: 100%;
      }

      &__date {
        margin-top: 1%;
        font-size: 100%;
        font-weight: 600;
      }
    }

    .certificate-conclusion {
      margin-top: 6%;

      &__label {
        font-size: 100%;
        font-style: italic;
      }

      &__name {
        margin-top: 1%;
        font-size: 120%;
        font-weight: 600;
        text-transform: uppercase;
      }
    }
  }
}
</style>
