<template>
  <div id="splashPage">
    <div class="snap-logo">
      <img class="snap-logo-img" src="@/renderer/assets/logo.svg" alt="snapvolt">
      {{ noSnaps }}
      <h1 class="subtitle is-2" v-if="!noSnaps">Please wait while your snaps are being loaded</h1>
      <h1 class="subtitle is-2" v-if="noSnaps">You do not have any snaps installed! Add some from the menu!</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'splash-screen',
  props: ['noSnaps']
}
</script>

<style lang="scss" scoped>
@import '../globals.scss';
#splashPage {
  height: 100%;
  background-color: $D_SLATE_GRAY;

  .subtitle {
    color: #FFF;
    text-align: center
  }
}
</style>
