<template>
  <div class="hangman">
    <div class="letters-container">
      <div class="attempts">
        <p>
          Tentativas restantes: <strong>{{ remainingAttemps }}</strong>
        </p>
        <p>
          Acertos: <strong>{{ greenCount }}</strong>
        </p>
      </div>

      <div class="end-game-messages">
        <h2 v-if="gameStatus" class="game-status-message">
          Você
          <span v-if="gameStatus === 'win'">GANHOU!!!</span>
          <span v-if="gameStatus === 'lose'">perdeu</span>
        </h2>

        <h4 v-if="gameStatus === 'lose'" class="discovered-word">
          A palavra era "{{ choisedWord }}"
        </h4>
      </div>

      <div class="letters">
        <div
          class="letters-group"
          v-for="(wordByWord, wordIndex) in choisedWordByWord"
          :key="wordIndex"
        >
          <p
            class="letter-item"
            v-for="letterData in wordByWord"
            :key="letterData.letter"
            :class="letterData.letter"
          >
            {{ letterData.show ? letterData.letter : "_" }}
          </p>
        </div>
      </div>
    </div>

    <div class="gallows-image">
      <img
        v-if="redCount"
        :src="`/images/hangman/${redCount}.png`"
        :alt="`Erros: ${redCount}`"
      />
    </div>

    <div class="buttons-container">
      <button
        v-for="buttonOption in preparedLetterOptions"
        :class="[
          'hangman-button',
          {
            'hangman-button--hit': buttonOption.status === true,
            'hangman-button--mistake': buttonOption.status === false,
          },
        ]"
        :key="buttonOption.letter"
        class="hangman-button"
        type="button"
        :disabled="disabledButtons || buttonOption.status !== null"
        @click="handleChoicedWord(buttonOption)"
      >
        {{ buttonOption.letter }}
      </button>
    </div>

    <img id="hangman" />
  </div>
</template>

<script>
import { computed, ref } from "vue";

export default {
  name: "HangmanGame",
  props: {
    parameters: {
      type: Array,
    },
  },
  setup(props) {
    const MAX_ATTEMPS = 9;
    const letterOptions = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",

      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",

      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];

    const words = ref(props.parameters);
    const redCount = ref(0);
    const greenCount = ref(0);
    const gameStatus = ref(null);

    const choisedWord = computed(() => {
      let wordList = words.value;
      let currentIndex = wordList.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = wordList[currentIndex];
        wordList[currentIndex] = wordList[randomIndex];
        wordList[randomIndex] = temporaryValue;
      }

      return wordList[0].toUpperCase();
    });

    const filteredWord = computed(() =>
      [...new Set(choisedWord.value.replace(" ", "").split(""))].join("")
    );

    const letterCount = computed(
      () => filteredWord.value.replace(" ", "").length
    );
    const disabledButtons = computed(
      () => redCount.value >= 9 || !!gameStatus.value
    );
    const remainingAttemps = computed(() => MAX_ATTEMPS - redCount.value);

    const preparedLetterOptions = ref(
      letterOptions.map((letter) => ({
        letter,
        status: null,
      }))
    );
    const choisedWordByWord = ref(
      choisedWord.value.split(" ").map((word) =>
        word.split("").map((letter) => ({
          letter,
          show: false,
        }))
      )
    );

    const handleChoicedWord = (buttonOption) => {
      if (buttonOption.letter === "ç") {
        buttonOption.letter = "C";
      }

      const matchIndex = choisedWord.value.indexOf(buttonOption.letter);
      if (matchIndex === -1) {
        mistakeFlow(buttonOption);
        return;
      }

      hitFlow(buttonOption);
    };

    const mistakeFlow = (buttonOption) => {
      buttonOption.status = false;
      redCount.value += 1;

      if (redCount.value >= MAX_ATTEMPS) {
        gameStatus.value = "lose";
      }
    };

    const hitFlow = (buttonOption) => {
      buttonOption.status = true;
      greenCount.value += 1;

      for (let wordByWord of choisedWordByWord.value) {
        for (let letterData of wordByWord) {
          if (letterData.letter === buttonOption.letter) {
            letterData.show = true;
          }
        }
      }

      console.log(greenCount.value, letterCount.value);
      if (greenCount.value === letterCount.value) {
        gameStatus.value = "win";
      }
    };

    return {
      gameStatus,
      redCount,
      greenCount,
      choisedWord,
      choisedWordByWord,
      disabledButtons,
      remainingAttemps,
      preparedLetterOptions,
      handleChoicedWord,
    };
  },
};
</script>

<style lang="scss">
.hangman {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background: #bcc4cd;

  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .letters-container {
    grid-area: letters;
  }
  .gallows-image {
    grid-area: gallowsimage;
  }
  .buttons-container {
    grid-area: buttons;
  }

  grid-template-areas:
    "letters gallowsimage"
    "buttons buttons";

  .buttons-container {
    width: fit-content;
    user-select: none;

    display: grid;
    grid-template-columns: repeat(13, 1fr);
    gap: 2px;
  }

  .hangman-button {
    background: #3a3a3e;
    color: #fff;

    width: 40px;
    font-size: 20px;
    border-radius: 4px;

    text-align: center;
    font-family: "Courier New", Courier, monospace;

    &:nth-of-type(27) {
      grid-column: 3;
    }
  }

  .letters {
    display: flex;
    gap: 5px;

    &-group {
      display: flex;
    }

    &-container {
      width: 350px;
      height: 250px;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
  }

  .attempts {
    width: 100%;
    text-align: start;

    p {
      font-size: 14px;
    }

    strong {
      font-weight: 700;
    }
  }

  .end-game-messages {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;

    .game-status-message {
      font-size: 50px;
      text-align: center;
    }

    .discovered-word {
      font-size: 15px;
    }
  }

  .letter-item {
    width: 22px;
    text-align: center;
    font-size: 20px;
  }

  .gallows-image {
    width: 250px;
    height: 250px;
    justify-self: end;

    img {
      width: 100%;
    }
  }
}
</style>
