<template>
  <div class="hangman" ref="hangman">
    <div class="hangman__buttons">
      <button class="hangman__button" value="A">A</button>
      <button class="hangman__button" value="B">B</button>
      <button class="hangman__button" value="C">C</button>
      <button class="hangman__button" value="D">D</button>
      <button class="hangman__button" value="E">E</button>
      <button class="hangman__button" value="F">F</button>
      <button class="hangman__button" value="G">G</button>
      <button class="hangman__button" value="H">H</button>
      <button class="hangman__button" value="I">I</button>
      <button class="hangman__button" value="J">J</button>
      <button class="hangman__button" value="K">K</button>
      <button class="hangman__button" value="L">L</button>
      <button class="hangman__button" value="M">M</button>
      <br />
      <br />
      <button class="hangman__button" value="N">N</button>
      <button class="hangman__button" value="O">O</button>
      <button class="hangman__button" value="P">P</button>
      <button class="hangman__button" value="Q">Q</button>
      <button class="hangman__button" value="R">R</button>
      <button class="hangman__button" value="S">S</button>
      <button class="hangman__button" value="T">T</button>
      <button class="hangman__button" value="U">U</button>
      <button class="hangman__button" value="V">V</button>
      <button class="hangman__button" value="W">W</button>
      <button class="hangman__button" value="X">X</button>
      <button class="hangman__button" value="Y">Y</button>
      <button class="hangman__button" value="Z">Z</button>
      <br />
      <br />
      <button class="hangman__button" value="1">1</button>
      <button class="hangman__button" value="2">2</button>
      <button class="hangman__button" value="3">3</button>
      <button class="hangman__button" value="4">4</button>
      <button class="hangman__button" value="5">5</button>
      <button class="hangman__button" value="6">6</button>
      <button class="hangman__button" value="7">7</button>
      <button class="hangman__button" value="8">8</button>
      <button class="hangman__button" value="9">9</button>
      <br />
      <br />
    </div>

    <div id="letters">
      <p v-for="letter in word" :key="letter" :class="letter">
        {{ letter }}
      </p>
    </div>
    <img id="hangman" />
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "HangmanGame",
  props: {
    parameters: {
      type: Array,
    },
  },
  data() {
    return {
      word: null,
    };
  },
  mounted() {
    let words = [...this.parameters];

    let images = [
      "http://i.imgur.com/WNQezBl.png",
      "http://i.imgur.com/KHdnjLj.png",
      "http://i.imgur.com/7xJ6Y8p.png",
      "http://i.imgur.com/7ADQUjJ.png",
      "http://i.imgur.com/YQHDg0c.png",
      "http://i.imgur.com/hEkBN1h.png",
      "http://i.imgur.com/oRytBR1.png",
      "http://i.imgur.com/KoW5M8y.png",
      "http://i.imgur.com/LfM2JKe.png",
    ];

    function shuffle(array) {
      //shuffle array function
      let currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    shuffle(words);
    let word = words[0];
    let redCount = 0;
    let greenCount = 0;
    let imageCount = -1;

    let unique = ""; //find unique characters
    console.log(word, unique);
    for (let i = 0; i < word.length; i++) {
      if (unique.indexOf(word[i]) == -1) {
        unique += word[i];
      }
    }

    let letterCount = unique.length; //count of unique letters

    this.word = word;
    // for (let i = 0; i < word.length; i++) {
    //   //create a paragraph for each letter
    //   $("#letters").append("<p class=" + word[i] + ">" + word[i] + "</p>");
    // }

    $(".hangman__button").each(function () {
      $(this).click(function () {
        console.log(this);
        let buttonValue = $(this).val(); //letter value of button
        let buttonIndex = word.indexOf(buttonValue); //index of button within word
        if (buttonIndex == -1) {
          //if wrong letter is clicked
          $(this).css("background-color", "red");
          $(this).css("color", "white");
          redCount++; //increase count on wrong letter
          imageCount++;
          $("#hangman").attr("src", images[imageCount]);
        } else {
          //if correct letter is clicked
          $(this).css("background-color", "green");
          $(this).css("color", "white");
          word.replace(buttonValue, buttonValue); //replace black with letter
          $("." + buttonValue).css("background-color", "white");
          greenCount++; //increase count on correct letter
        }

        let totalCount = redCount + greenCount;
        let score = Math.round((greenCount / totalCount) * 100);

        if (redCount == 9) {
          alert("GAME OVER. THE WORD WAS: " + word + ".");
          // window.location.reload();
        } else if (greenCount == letterCount) {
          alert("YOU WIN, WITH " + score + "% ACCURACY.");
          // window.location.reload();
        }

        $(this).off(); //turn click off
      });
    });
  },
  unmounted() {
    this.$el.remove();
    // this.$refs.hangman.remove();
  },
};
</script>

<style lang="scss">
.hangman {
  margin: 0 auto;
  height: 100%;
  background: #fff;

  &__buttons {
    text-align: center;
  }

  p {
    display: inline;
    background-color: black;
    margin-right: 5px;
    padding-right: 5px;
    padding-left: 5px;
    font-size: 20px;
  }
  button {
    text-align: center;
    width: 40px;
    font-family: "Courier New", Courier, monospace;
    font-size: 20px;
  }
  body {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-family: "Courier New", Courier, monospace;
  }
  img {
    width: 250px;
  }
  h1 {
    font-size: 40px;
  }
}
</style>
