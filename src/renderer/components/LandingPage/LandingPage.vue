<template>
  <div class="columns">
    <div class="column is-narrow">
      <main-menu @showSnaps="toggleSnapsList" @hideSnaps="hideSnapsList"/>
    </div>
    <div class="column">
      <supported v-if="showSnaps" />
    </div>
  </div>
</template>

<script>
import MainMenu from '@/renderer/components/Menu/MainMenu'
import Supported from '@/renderer/components/Menu/SupportedSnaps'
export default {
  name: 'LandingPage',
  components: {
    MainMenu,
    Supported
  },
  data() {
    return {
      showSnaps: false
    }
  },
  mounted () {
    this.$viewEmitter.on('addView', () => {
      console.log("added a view!")
      console.log(this.$VM)
    })
  },
  methods: {
    toggleSnapsList () {
      // this.$VM.addViewFromRemote(60, 0, 60, 320, 'http://google.com')
      // this.$DB.addSnap('http://google.com')
      // this.$viewEmitter.emit('addView')
      // this.$VM.setActiveView(null)
      this.showSnaps = !this.showSnaps;
    },
    hideSnapsList () {
      this.showSnaps = false
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
