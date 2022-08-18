<template>
  <section class="login-page">
    <AvCard>
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
    </AvCard>
  </section>
</template>

<script>
import AvCard from "atoms/AvCard.vue";

import { ref } from "vue";
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

    return {
      I18N_PATH,
      username,
      password,
      showPassword,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-page {
  &__form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
