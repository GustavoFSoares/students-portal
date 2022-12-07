<template>
  <article class="trail-knowledge">
    <div class="trail-knowledge__title-wrapper">
      <img
        class="trail-knowledge__title-image"
        src="~assets/img/activities/2.png"
        alt="trail-knowledge-icon"
      />

      <h3 class="trail-knowledge__title">Trilha de Conhecimento</h3>
    </div>

    <p class="trail-knowledge__description">
      Sabemos que existem ferramentas e tecnologias que auxiliam na aprendizagem
      e otimizam todo o processo, por torná-lo mais dinâmico, interativo e
      interessante ao aluno.
    </p>

    <div class="trail-knowledge__decoration">
      <img
        class="trail-knowledge__decoration-image"
        src="~assets/img/activities/3.png"
        alt="trail-knowledge-descoration"
      />
    </div>
  </article>
</template>

<script>
const I18N_PATH = "modules.activities.partials.trailKnowledge";

export default {
  name: "TrailKnowledge",
  setup() {
    return {
      I18N_PATH,
    };
  },
};
</script>

<style lang="scss" scoped>
.trail-knowledge {
  padding: 20px 40px;
  border-radius: $default-border-radius;
  background-image: url("/cubes.png"),
    linear-gradient(
      to right top,
      #cf4af3,
      #e73bd7,
      #f631bc,
      #fd31a2,
      #ff3a8b,
      #ff4b78,
      #ff5e68,
      #ff705c,
      #ff8c51,
      #ffaa49,
      #ffc848,
      #ffe652
    );

  &__title-wrapper {
    grid-area: title;
  }
  &__description {
    grid-area: description;
  }
  &__decoration {
    grid-area: knowledgedecoration;
  }

  display: grid;
  grid-template-areas:
    "title knowledgedecoration"
    "description knowledgedecoration";

  &__title {
    font-size: 17px;
    color: $text-color-3;

    &-wrapper {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    &-image {
      width: 45px;
      height: 45px;
    }
  }

  &__description {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.7em;

    color: $text-color-3;

    margin-top: 16px;
    max-width: 450px;
  }

  &__decoration {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    &-image {
      width: 186px;
      height: 186px;
    }
  }
}
</style>
