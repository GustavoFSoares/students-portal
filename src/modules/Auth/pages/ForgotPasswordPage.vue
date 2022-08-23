<template>
  <section class="forgot-password-page">
    <AvCard>
      <div class="forgot-password-page__wrapper">
        <article class="forgot-password-page__form">
          <QInput
            class="forgot-password-page__input"
            v-model="email"
            dense
            filled
            :label="$t(`${I18N_PATH}.form.email`)"
          />

          <transition name="forgot-password-page__response-message">
            <p
              class="forgot-password-page__response-message"
              v-if="hadRequestSended"
            >
              {{ $t(`${I18N_PATH}.responseMessage`) }}
            </p>
          </transition>
        </article>

        <div class="forgot-password-page__buttons-wrapper">
          <QBtn
            class="forgot-password-page__submit"
            color="primary"
            :label="$t(`${I18N_PATH}.submit`)"
            :disable="!allowSubmit"
            :loading="isLoading"
            @click="handleClick"
          />

          <QBtn
            class="forgot-password-page__go-back"
            color="primary"
            flat
            :label="$t(`${I18N_PATH}.goBack`)"
            :to="{ name: 'auth.login' }"
            :disable="isLoading"
          />
        </div>
      </div>
    </AvCard>
  </section>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import AvCard from "atoms/AvCard.vue";

const I18N_PATH = "modules.auth.forgotPassword";

export default {
  name: "LoginPage",
  components: {
    AvCard,
  },
  setup() {
    const $store = useStore();

    const email = ref();
    const hadRequestSended = ref(false);

    const allowSubmit = computed(() => !!email.value);
    const isLoading = computed(() => {
      return $store.state.AuthModule.loading;
    });

    const handleClick = async () => {
      email.value = undefined;

      await $store.dispatch("AuthModule/doRestartPassword", {
        email: email.value,
      });

      hadRequestSended.value = true;
    };

    return {
      I18N_PATH,
      email,
      hadRequestSended,
      allowSubmit,
      isLoading,
      handleClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.forgot-password-page {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__response-message {
    margin: 0 25px;

    &-enter-active,
    &-leave-active {
      transition: opacity 0.8s ease-in;
    }

    &-enter-from,
    &-leave-to {
      opacity: 0;
    }
  }

  &__buttons-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
