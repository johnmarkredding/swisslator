<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <TextBox label="Swiss German" placeholder="Welcome to Your Vue.js App. Type Swiss German here to be translated" />
</template>

<script>
import TextBox from './components/TextBox.vue'

export default {
  name: 'App',
  components: {
    TextBox
  }
}
console.log(process.env);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
