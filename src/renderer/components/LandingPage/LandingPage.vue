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
    <div id="mainBody" class="column">
      <supported v-if="showSnaps" />
      <settings v-if="showSettings" />
    </div>
  </div>
</template>

<script>
import MainMenu from '@/renderer/components/Menu/MainMenu'
import Supported from '@/renderer/components/Menu/SupportedSnaps'
import Settings from '@/renderer/components/Menu/SettingsMenu'
export default {
  name: 'LandingPage',
  components: {
    MainMenu,
    Supported,
    Settings
  },
  data() {
    return {
      showSnaps: false,
      showSettings: false
    }
  },
  mounted () {
    const parent = document.getElementById('mainBody')
    this.$VM.setParent(parent)
    this.$DB.getInstalledSnaps()
  },
  methods: {
    toggleSnapsList () {
      this.showSnaps = !this.showSnaps;
    },
    hideSnapsList () {
      this.showSnaps = false
    },
    toggleSettings () {
      this.showSettings = !this.showSettings
    },
    hideSettings () {
      this.showSettings = false
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
