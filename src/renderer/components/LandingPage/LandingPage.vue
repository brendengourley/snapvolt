<template>
  <div class="columns">
    <div class="column is-narrow">
      <main-menu/>
    </div>
    <div class="column">
    </div>
  </div>
</template>

<script>
import MainMenu from '@/renderer/components/Menu/MainMenu'
import VM from '@/main/ViewManager'
import viewEmitter  from '@/main/constants'
console.log(viewEmitter)
console.log(VM)
export default {
  name: 'landing-page',
  components: {
    MainMenu
  }
}
</script>

<style lang="scss" scoped>
</style>
