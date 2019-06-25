<template>
  <div class="columns">
    <div class="column is-narrow">
      <main-menu />
      <button @click="button">
        click me
      </button>
    </div>
    <div class="column" />
  </div>
</template>

<script>
import MainMenu from '@/renderer/components/Menu/MainMenu'
export default {
  name: 'LandingPage',
  components: {
    MainMenu
  },
  mounted () {
    this.$viewEmitter.on('addView', () => {
      console.log("added a view!")
      console.log(this.$VM)
    })
  },
  methods: {
    button() {
      this.$VM.addViewFromRemote(60, 0, 60, 320, 'http://google.com')
      this.$DB.addSnap('http://google.com')
      this.$viewEmitter.emit('addView')
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
