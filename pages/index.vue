<template>
  <div class="text-uppercase d-flex w-100 py-4">
    <div class="mx-auto">
      <h1 class="font-weight-bold text-center text-light mb-3">WORDLE WEB</h1>
      <div class="container d-flex" v-for="(i, parentIndex) in slots" :key="'index' + parentIndex">
        <input @keydown.enter="submit" autocomplete="off" :id="'slot'+parentIndex+index"
               @keyup="cleanChar($event, parentIndex, index)"
               v-for="(arr, index) in i"
               :readonly="(parentIndex) !== currentIndex"
               class="field d-inline-block text-uppercase"
               :key="'arr'+index" maxlength="1" v-model="slots[parentIndex][index]" type="text"/>
      </div>
      <div class="d-flex justify-content-center mt-3">
        <div>
          <button class="btn btn-success" @click="submit">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from "assets/data";

export default {
  name: 'IndexPage',
  data() {
    return {
      wordBank: data,
      chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      currentIndex: 0,
      slots: [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
      ],
      word: 'today',
    }
  },
  mounted() {
  },
  computed: {
    wordOfTheDay() {
      let word = this.word.toLowerCase();
      return word.split('')
    },
    validChars() {
      return this.chars.split('')
    }
  },
  methods: {
    cleanChar(event, parentIndex, index) {
      if (!this.validChars.includes(event.key)) {
        event.preventDefault();
      } else {
        if (parentIndex === this.currentIndex) {
          if (index < 4) {
            ++index;
            document.querySelector(`#slot${parentIndex}${index}`).focus();
          }
        }
      }
    },
    checkSlotValues() {
      return !this.slots[this.currentIndex].includes('');
    },
    inWordBank(word) {
      return this.wordBank.includes(word);
    },
    submit() {
      console.log(this.wordBank.length)
      if (this.checkSlotValues()) {
        const word = this.slots[this.currentIndex].join('');
        if (this.inWordBank(word)) {
          if (word.toLowerCase() !== this.word.toLowerCase()) {
            this.compareChars(this.currentIndex);
          } else {
            document.querySelectorAll('.field').forEach(elt => {
              elt.setAttribute('readonly', true)
            })
            for (let i = 0; i < 5; i++) {
              document.querySelector(`#slot${this.currentIndex}${i}`).style.background = '#528a4c'
            }
          }
        }
        else {
          alert("Invalid word")
        }
      }
    },
    compareChars(slotIndex) {
      this.slots[slotIndex].forEach((character, index) => {
        if (character === this.wordOfTheDay[index]) {
          document.querySelector(`#slot${slotIndex}${index}`).style.background = '#528a4c';
        } else if (this.wordOfTheDay.includes(character)) {
          document.querySelector(`#slot${slotIndex}${index}`).style.background = '#c3af4e';
        } else {
          document.querySelector(`#slot${slotIndex}${index}`).style.background = '#272424';
        }
      })
      if (this.currentIndex < 4) ++this.currentIndex;
      else {
        alert("YOU LOSE!!!")
      }

    }
  }
}
</script>
<style>
body {
  background-color: #333;
}

.container {
  width: fit-content;
  max-width: 100vw;
}

.field {
  background-color: #666666;
  color: white;
  font-weight: bold;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.8);
  font-size: 30px;
  width: 70px;
  height: 70px;
  margin: 3px;
  text-align: center;
}

.field:focus, .field:active {
  border-color: white;
}

.btn {
  width: 373px;
  text-align: center;
  height: 60px;
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 16px;
  justify-content: center;
}

:focus-visible {
  box-shadow: unset;
  border: unset;
}
</style>
