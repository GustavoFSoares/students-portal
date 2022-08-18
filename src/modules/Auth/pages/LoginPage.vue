<template>
  <section class="login-page">
    <AvCard>
      <div class="login-page__wrapper">
        <article class="login-page__form">
          <QInput
            v-model="username"
            dense
            filled
            :label="$t(`${I18N_PATH}.form.username`)"
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

        <article class="login-page__forgot-password">
          <router-link :to="{ name: 'auth.forgot' }">
            <QBtn
              flat
              color="primary"
              size="xs"
              :label="$t(`${I18N_PATH}.forgotPassword`)"
            />
          </router-link>
        </article>

        <QBtn
          class="login-page__submit"
          color="primary"
          :label="$t(`${I18N_PATH}.submit`)"
          :disable="!allowSubmit"
          @click="handleClick"
        />
      </div>
    </AvCard>
  </section>
</template>

<script>
import AvCard from "atoms/AvCard.vue";

import { computed, ref } from "vue";
const I18N_PATH = "modules.auth.login";

export default {
  name: "LoginPage",
  components: {
    AvCard,
  },
  setup() {
    const username = ref("");
    const password = ref("");
    const showPassword = ref(false);
    const allowSubmit = computed(() => !!username.value && !!password.value);

    const handleClick = () => {
      console.log("handleClick");
    };

    return {
      I18N_PATH,
      username,
      password,
      showPassword,
      allowSubmit,

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
