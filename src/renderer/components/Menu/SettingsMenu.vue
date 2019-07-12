<template>
  <div id="settingsMenu">
    <section class="hero is-medium is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Settings
          </h1>
        </div>
      </div>
    </section>
    <div class="columns snapSettings">
      <div class="column is-2">
        <button class="button is-dark" @click="openGeneralSettings">
          General
        </button>
        <button class="button is-dark" @click="openAppSettings">
          My Snaps
        </button>
      </div>
      <div class="is-divider-vertical" />
      <div class="column" v-if="generalSettings">
        <div class="field">
          <input
            id="darkMode"
            type="checkbox"
            name="darkMode"
            class="switch is-rounded"
          >
          <label for="darkMode">Dark Mode</label>
        </div>
      </div>
      <div class="column appSettings" v-if="appSettings">
        <div class="columns box" v-for="snap in installedSnaps" :key="snap.id">
          <div class="column is-1">
            <div class="snap-app">
              <span :class="snap.icon" />
            </div>
            <div>
              <p>{{ snap.name }}</p>
            </div>
          </div>
          <div class="column">
            <button class="button is-danger" @click="removeSnap(snap.id)">
              Remove Snap
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsMenu',
  data () {
    return {
      generalSettings: true,
      appSettings: false,
      installedSnaps: []
    }
  },
  mounted () {
    this.installedSnaps = this.$DB.installedSnaps
  },
  methods: {
    openGeneralSettings () {
      this.generalSettings = true
      this.appSettings = false
    },
    openAppSettings () {
      this.appSettings = true
      this.generalSettings = false
    },
    removeSnap (id) {
      this.$DB.removeSnap(id)
      // Remove from array. But id is 1 based, so set it to be a zero based index
      this.installedSnaps.splice((id - 1), 1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../globals.scss';
.snapSettings {
  padding: 20px;

  .snap-app {
    cursor: pointer;
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

  .appSettings {
    .box {
      margin: 10px 0 !important;
    }
  }
}
</style>
