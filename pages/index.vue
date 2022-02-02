<template>
  <div class="text-uppercase d-flex w-100 py-4">
    <div class="mx-auto">
      <h1 class="font-weight-bold h3 text-center text-light mb-3">WORDLE WEB</h1>
      <div class="container d-flex" v-for="(i, parentIndex) in slots" :key="'index' + parentIndex">
        <input autocomplete="off" :id="'slot'+parentIndex+index"
               @input="cleanChar($event, parentIndex, index)"
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
    <div class="win align-items-center justify-content-center">
      <div>
        <img src="/correct.gif" class="img-fluid mt-n4" alt="">
      </div>
    </div>
    <div class="lose align-items-center justify-content-center">
      <div>
        <img src="/game-over.gif" class="img-fluid mt-n4" alt="">
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
      if (!this.validChars.includes(event.target.value)) {
        event.preventDefault();
      } else {
        if (parentIndex === this.currentIndex) {
          if (event.target.value.length >= event.target.getAttribute('maxlength')) {
            if (index < 4) {
              ++index;
              document.querySelector(`#slot${parentIndex}${index}`).focus();
            }
          }
        }
      }
    },
    checkSlotValues() {
      return !this.slots[this.currentIndex].includes('');
    },
    inWordBank(word) {
      let wrd = word.toLowerCase()
      return this.wordBank.includes(wrd);
    },
    async submit() {
      if (this.checkSlotValues()) {
        const word = this.slots[this.currentIndex].join('');
        if (this.inWordBank(word)) {
          if (word.toLowerCase() !== this.word.toLowerCase()) {
            await this.compareChars(this.currentIndex);
          } else {
            document.querySelectorAll('.field').forEach(elt => {
              elt.setAttribute('readonly', 'true')
            })
            let count = 0
            for (let i = 0; i < 5; i++) {
              count++
              document.querySelector(`#slot${this.currentIndex}${i}`).style.background = '#528a4c'
            }
            document.querySelector('.win').style.display = 'flex'
          }
        } else {
          alert("Invalid word")
        }
      }
    },
    async compareChars(slotIndex) {
      await this.slots[slotIndex].forEach((character, index) => {
        let char = character.toString()
        console.log(char === character)
        if (character === this.wordOfTheDay[index]) {
          document.querySelector(`#slot${slotIndex}${index}`).style.background = '#528a4c';
        } else if (this.wordOfTheDay.findIndex(element => element === character) >= 1) {
          document.querySelector(`#slot${slotIndex}${index}`).style.background = '#c3af4e';
        }
      })
      if (this.currentIndex < 5) ++this.currentIndex;
      else {
        document.querySelector('.lose').style.display = 'flex'
        setTimeout(() => {
          window.location.reload()
        }, 5000)
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
  width: 60px;
  height: 60px;
  margin: 3px;
  text-align: center;
}

.field:focus, .field:active {
  border-color: white;
}

.btn {
  width: 321px;
  text-align: center;
  height: 55px;
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

.win, .lose {
  position: fixed;
  width: 100vw;
  display: none;
  height: 100vh;
}
</style>
