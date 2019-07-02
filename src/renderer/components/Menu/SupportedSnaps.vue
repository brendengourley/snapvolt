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
    <div class="columns supportedSnaps">
      <div class="column is-2">
        <h1>Future home of categories!</h1>
      </div>
      <div class="column supportedList">
        <div class="columns" v-for="(chunk, chunkKey) in snapChunks" :key="chunkKey">
          <div class="column is-3" v-for="snap in chunk" :key="snap.name">
            <div class="snap-app box" @click="addSnap(snap)">
              <div class="snap-app-icon">
                <span :class="snap.icon" />
              </div>
              <p class="snap-name">{{ snap.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
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
    addSnap (snap) {
      this.$DB.addSnap(snap.url, snap.name, snap.icon, snap.slug)
    }
  },
  computed: {
    snapChunks () {
      return _.chunk(this.supportedSnapsList.supported, 4)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../globals.scss';
$black: hsl(0, 0%, 4%);
.supportedSnaps {
  padding: 20px;

  .snap-app {
    display: flex;
    padding: 1rem;
    margin: 1rem;
    cursor: pointer;
    user-select: none;

    &:hover {
      box-shadow: 0 2px 3px rgba($black, 0.3), 0 0 0 1px rgba($black, 0.3)
    }

    &-icon {
      display: flex;
      background-color: $WHITE_SMOKE;
      box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.36);
      width: 30px;
      height: 30px;
      border-radius: 50%;
      padding: 5px;

      span:before {
        margin: auto;
        font-size: 15pt;
      }
    }

    .snap-name {
      margin-left: 10px;
      line-height: 30px;
      font-weight: bold;
      user-select: none;
    }
  }
}
</style>
