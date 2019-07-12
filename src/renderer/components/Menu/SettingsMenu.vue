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
      <div class="column is-2 snapTabButtons">
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
        <div class="box" v-for="snap in installedSnaps" :key="snap.id">
          <div class="columns">
            <div class="column is-3">
              <div class="snap-app">
                <span :class="snap.icon" />
              </div>
              <div class="snap-app-name">
                <p>{{ snap.name }}</p>
              </div>
            </div>
            <div class="column">
              <i
                class="fas fa-trash-alt removeSnap"
                @click="removeSnap(snap.id)"
              />
            </div>
          </div>
          <div class="is-divider is-settings-custom" />
          <div class="columns">
            <div class="field">
              <input
                :id="snap.id"
                type="checkbox"
                :name="snap.name"
                class="switch is-rounded"
                :disabled="snap.darkModeAllowed === 0"
              >
              <label :for="snap.id">Dark Mode</label>
              <p v-if="snap.darkModeAllowed === 0" class="darkmode-warn">
                Dark Mode is currently not supported for this snap
              </p>
            </div>
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

  .switch {
    &[type=checkbox]:focus+label {
      &::before, &:before, &::after, &:after {
        outline: none !important;
      }
    }
  }

  .snapTabButtons {
    .button {
      margin: 5px 0;
    }
  }

  .snap-app {
    display: inline-block;
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

  .snap-app-name {
    display: inline-block;
    margin-left: 5px;
  }

  .appSettings {
    .box {
      margin: 10px 0 !important;
    }

  }

  .is-settings-custom {
    margin: 1rem 0;

    .darkmode-warn {
      font-size: 10pt;
      font-weight: bold;
    }
  }

  .removeSnap {
    font-size: 15pt;
    float: right;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.36);
    }
  }
}
</style>
