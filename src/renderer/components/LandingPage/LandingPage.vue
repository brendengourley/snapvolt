<template>
  <div class="columns global-body">
    <div class="column is-narrow">
      <main-menu @showSnaps="toggleSnapsList" @hideSnaps="hideSnapsList"/>
    </div>
    <div class="column" id="mainBody">
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
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
