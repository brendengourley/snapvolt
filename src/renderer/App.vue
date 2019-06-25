<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'snapvolt'
  }
</script>

<style>
html, body, #app, .columns{
  height: 100%;
}

.column {
  padding: 0 !important;
}

hr {
    height: 1px !important;
    background-color: #e6e6e6 !important;
    margin: 2em 0 !important;
}
</style>
