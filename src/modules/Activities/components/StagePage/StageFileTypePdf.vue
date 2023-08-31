<template>
  <section class="stage-file-type-pdf">
    <iframe
      :src="`${$appStorage}/${path.arquivo}?page=1`"
      frameborder="0"
      width="100%"
      height="100%"
    />
  </section>
</template>

<script>
export default {
  name: "StageFileTypePdf",
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  created() {
    console.log(path)
  }
};
</script>

<style lang="scss">
.stage-file-type-pdf {
  height: 100%;
  max-width: 1150px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  iframe {
    height: 100%;
  }

  &__button {
    margin-top: 5px;
    width: 100%;

    display: flex;
    justify-content: flex-end;
  }
}
</style>
