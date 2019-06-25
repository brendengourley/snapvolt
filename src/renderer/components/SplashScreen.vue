<template>
  <div id="splashPage" v-if="isLoading">
    <div class="snap-logo">
      <img class="snap-logo-img" src="@/renderer/assets/logo.svg" alt="snapvolt">
    </div>
  </div>
</template>

<script>
export default {
  name: 'splash-screen',
  props: ['isLoading'],
  watch: {
    isLoading () {
      console.log(this.isLoading)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../globals.scss';
#splashPage {
  height: 100%;
  background-color: $D_SLATE_GRAY;
}
</style>
