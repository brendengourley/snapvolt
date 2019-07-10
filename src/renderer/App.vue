<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'Snapvolt',
    beforeDestroy () {
      this.$DB.destroy()
    }
  }
</script>

<style>
html {
  overflow-y:hidden;
}

html, body, #app, .global-body {
  height: 100%;
}

.columns {
  margin: 0 !important;
}

.webview {
  height: 100%;
  display: none;
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
