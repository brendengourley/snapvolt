<template>
  <div class="columns global-body">
    <div class="column is-narrow">
      <main-menu
        @showSnaps="toggleSnapsList"
        @hideSnaps="hideSnapsList"
        @showSettings="toggleSettings"
        @hideSettings="hideSettings"
      />
    </div>
    <div
      id="mainBody"
      class="column"
    >
      <supported v-if="showSnaps" />
      <settings v-if="showSettings" />
      <transition name="fade">
        <splash v-if="showSplash" :noSnaps="noSnaps" />
      </transition>
    </div>
  </div>
</template>

<script>
import Splash from '@/renderer/components/SplashScreen'
import MainMenu from '@/renderer/components/Menu/MainMenu'
import Supported from '@/renderer/components/Menu/SupportedSnaps'
import Settings from '@/renderer/components/Menu/SettingsMenu'
export default {
  name: 'LandingPage',
  components: {
    MainMenu,
    Supported,
    Settings,
    Splash
  },
  data() {
    return {
      showSnaps: false,
      showSettings: false,
      showSplash: true,
      noSnaps: false
    }
  },
  mounted () {
    const parent = document.getElementById('mainBody')
    this.$VM.setParent(parent)
    this.$DB.getInstalledSnaps()

    this.$viewEmitter.on('viewsLoaded', () => {
      setTimeout( () => {
        if (this.$VM.views.length >= 1) {
          this.showSplash = false
        } else {
          this.noSnaps = true
        }
      }, 2000)
    })
  },
  methods: {
    toggleSnapsList () {
      this.showSnaps = !this.showSnaps;
      this.showSplash = false
    },
    hideSnapsList () {
      this.showSnaps = false
    },
    toggleSettings () {
      this.showSettings = !this.showSettings
      this.showSplash = false
    },
    hideSettings () {
      this.showSettings = false
    }
  },
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
