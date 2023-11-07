<template>
  <div id="app">
    <section>
      <p>Type Swiss German here to be translated</p>
      <label :for="languageA">{{ languageA }}</label>
      <textarea :id="languageA" :data-language="languageA" :placeholder="`${languageA} text`" v-model="textA" @input="onInput" />
      <button @click="swapLanguages">Swap</button>
      <label :for="languageB">{{ languageB }}</label>
      <textarea :id="languageB" :data-language="languageB" :placeholder="`${languageB} text`" v-model="textB" readonly />
    </section>
  </div>
</template>

<script>
import { Subject, debounceTime, distinctUntilKeyChanged, filter } from 'rxjs';
const {VUE_APP_SWISSLATOR_API_URL:SWISSLATOR_API_URL} = process.env;
export default {
  name: 'TranslatorComponent',
  data() {
    return {
      textA: '',
      textB: '',
      languageA: 'Swiss',
      languageB: 'English',
      debouncer$: new Subject(),
      fetchAborter: new AbortController()
    };
  },
  methods: {
    swapLanguages() {
      [this.textA, this.textB] = [this.textB, this.textA];
      [this.languageA, this.languageB] = [this.languageB, this.languageA];
    },
    async translateText(text, language) {
      console.log("text", text, "language: " + language);
      try {
        this.fetchAborter.abort();
        this.fetchAborter = new AbortController();
        const response = await fetch(SWISSLATOR_API_URL, {
          signal: this.fetchAborter.signal,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text, language }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        this.textB = data.text;
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    },
    onInput({target: {value: text}}) {
      this.debouncer$.next({text, language: this.languageA});
    },
  },
  mounted() {
    this.debouncer$
      .pipe(
        debounceTime(500),
        distinctUntilKeyChanged("text"),
        filter(rt => rt.text !== "")
      )
      .subscribe(({ text, language }) => {
        this.translateText(text, language);
      });
  },
  beforeUnmount() {
    this.debouncer$.complete(); // Complete the Subject to clean up
  }
};
</script>

<style>
body {
  margin: 0;
  width: 100%;
  min-height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
textarea {
  display: block;
  max-width: 60rem;
  width: 100%;
  margin: auto;
}

label {
  display: block;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>