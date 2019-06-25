<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'Snapvolt',
    mounted() {
      this.$VM.addViewFromRemote(60, 0, 60, 320, 'http://google.com')
      console.log(this.$VM)
    },
    beforeDestroy () {
      this.$DB.destroy()
    }
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
