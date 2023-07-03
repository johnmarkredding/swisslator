<template>
  <TextBox @keyup.enter="onEnter()" label="Swiss German" name="language-input"
    placeholder="Welcome to Your Vue.js App. Type Swiss German here to be translated" />
  <TextBox label="English" name="language-output" placeholder="English output…" />
</template>

<script>
import TextBox from './components/TextBox.vue'

export default {
  name: 'App',
  components: {
    TextBox
  },
  methods: {
    onEnter() {
      console.log("Hello");
    }
  }
}
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
</style>
