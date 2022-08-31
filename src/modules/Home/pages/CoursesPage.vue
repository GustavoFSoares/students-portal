<template>
  <article class="courses-page">
    <SearchBar v-model="searchText" />
    {{ searchText }}

    <div>courses-page</div>
  </article>
</template>

<script>
import { ref } from "vue";
import SearchBar from "../components/SearchBar.vue";

export default {
  name: "courses-page",
  components: {
    SearchBar,
  },
  setup() {
    const searchText = ref("321");

    return {
      searchText,
    };
  },
};
</script>

<style lang="scss" scoped>
.courses-page {
  display: flex;
  flex-direction: column;
  gap: 25px;
}
</style>
