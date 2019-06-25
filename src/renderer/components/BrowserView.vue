<template>
  <div id="browserView">
    <splash-screen :isLoading="isLoading" />
    <webview :id="snapId" class="snap-web-view" :src="snapSrc"></webview>
  </div>
</template>

<script>
import SplashScreen from '@/renderer/components/SplashScreen'

export default {
  name: 'browser-view',
  props: ['snapId', 'snapSrc'],
  data () {
    return {
      isLoading: false,
      view: null
    }
  },
  mounted () {
    console.log('onmount')
    const webview = document.querySelector(`#${this.snapId}`)
    console.log(webview)
    webview.style.visibility = 'hidden'

    const loadstop = () => {
      console.log('stopped loading')
      webview.style.visibility = 'visible'
      this.isLoading = false
    }

    webview.addEventListener('did-stop-loading', loadstop)
  },
  components: {
    SplashScreen
  }
}
</script>

<style lang="scss" scoped>
#browserView {
  height: 100%;
  .snap-web-view {
    height: 100%;
  }
}
</style>
