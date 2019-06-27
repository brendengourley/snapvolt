<template>
  <div id="supportedSnaps">
    <section class="hero is-medium is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Add a Snap, in a snap!
          </h1>
          <h2 class="subtitle">
            Select a snap from the following list for full compatability.
          </h2>
        </div>
      </div>
    </section>
    <div class="columns">
      <div class="column is-3">
        <h1>Future home of categories!</h1>
      </div>
      <div class="column">
        <h1>Future Home of supported Snaps!</h1>
        <div class="snapsList" v-for="snap in supportedSnapsList.supported" :key="snap.name">
          <div class="snap-app">
            <i :class="snap.icon"/>
          </div>
        </div>
        <button class="button is-dark" @click="addTmp">Add a snap for dev</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SupportedSnaps',
  data () {
    return {
      supportedSnapsList: []
    }
  },
  mounted () {
    this.supportedSnapsList = this.$SnapManager.json
  },
  methods: {
    addTmp () {
      this.$eventBus.$emit('addTmp')
      this.$DB.addSnap('http://slack.com/signin', 'Slack')
    }
  }
}
</script>

<style lang="scss" scoped>
.columns {
  padding: 20px;
}
</style>
