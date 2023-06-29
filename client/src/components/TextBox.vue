<template>
  <section class="textbox">
    <label :for="name">{{ label }}</label>
    <textarea :id="name" :placeholder="placeholder"></textarea>
  </section>
</template>

<script>
export default {
  name: 'TextBox',
  props: {
    name: String,
    label: String,
    placeholder: String,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
