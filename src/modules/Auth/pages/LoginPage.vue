<template>
  <section class="login-page">
    <AvCard>
      <div class="login-page__wrapper">
        <article class="login-page__form">
          <QInput
            v-model="email"
            dense
            filled
            :label="$t(`${I18N_PATH}.form.email`)"
          />

          <QInput
            v-model="password"
            dense
            filled
            :type="showPassword ? 'password' : 'text'"
            :label="$t(`${I18N_PATH}.form.password`)"
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </QInput>
        </article>

        <transition name="login-page__error-message">
          <p class="login-page__error-message" v-if="hadFailedValidation">
            {{ $t(`${I18N_PATH}.failedValidation`) }}
          </p>
        </transition>

        <article class="login-page__forgot-password">
          <router-link :to="{ name: 'auth.forgot' }">
            <QBtn
              flat
              color="primary"
              size="xs"
              :label="$t(`${I18N_PATH}.forgotPassword`)"
              :disable="isLoading"
            />
          </router-link>
        </article>

        <QBtn
          class="login-page__submit"
          color="primary"
          :label="$t(`${I18N_PATH}.submit`)"
          :disable="!allowSubmit"
          :loading="isLoading"
          @click="handleClick"
        />
      </div>
    </AvCard>
  </section>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import AvCard from "atoms/AvCard.vue";

const I18N_PATH = "modules.auth.login";

export default {
  name: "LoginPage",
  components: {
    AvCard,
  },
  setup() {
    const $store = useStore();
    const $route = useRouter();

    const email = ref("");
    const password = ref("");
    const showPassword = ref(false);
    const hadFailedValidation = ref(false);

    const allowSubmit = computed(() => !!email.value && !!password.value);
    const isLoading = computed(() => {
      return $store.state.AuthModule.loading;
    });

    const handleClick = async () => {
      hadFailedValidation.value = false;

      const loginResponse = await $store.dispatch("AuthModule/doLogin", {
        email: email.value,
        password: password.value,
      });

      if (!loginResponse) {
        hadFailedValidation.value = true;
        return;
      }

      $route.push({ name: "home" });
    };

    return {
      I18N_PATH,
      email,
      password,
      showPassword,
      hadFailedValidation,
      allowSubmit,
      isLoading,
      handleClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-page {
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
  &__error-message {
    color: $negative;
    text-align: center;

    @keyframes shake {
      10%,
      90% {
        transform: translate3d(-1px, 0, 0);
      }

      20%,
      80% {
        transform: translate3d(2px, 0, 0);
      }

      30%,
      50%,
      70% {
        transform: translate3d(-4px, 0, 0);
      }

      40%,
      60% {
        transform: translate3d(4px, 0, 0);
      }
    }

    &-enter-active {
      animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }
    &-leave-active {
      transition: opacity 0.4s cubic-bezier(1, 0.5, 0.8, 1);
      opacity: 0;
    }
  }

  &__forgot-password {
    text-align: end;
    text-decoration: underline;
    color: $primary;
  }

  &__submit {
    width: 100%;
  }
}
</style>
