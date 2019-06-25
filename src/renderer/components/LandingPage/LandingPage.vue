<template>
  <div class="columns">
    <div class="column is-narrow">
      <main-menu/>
    </div>
    <div class="column">
      <browser-view :snapId="'whatever'" :snapSrc="'https://chat.google.com'"/>
    </div>
  </div>
</template>

<script>
import MainMenu from '@/renderer/components/Menu/MainMenu'
import BrowserView from '@/renderer/components/BrowserView'
export default {
  name: 'landing-page',
  components: {
    MainMenu,
    BrowserView
  }
}
</script>

<style lang="scss" scoped>
</style>
