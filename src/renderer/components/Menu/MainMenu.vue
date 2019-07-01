<template>
  <div id="menu">
    <div class="snap-icon">
      <img
        class="snap-icon-image"
        src="@/renderer/assets/icon.svg"
        alt="electron-vue"
      >
    </div>
    <div class="installedApps">
      <div
        v-if="installedSnaps.length >= 1"
        id="appsList"
      >
        <div
          v-for="snap in installedSnaps"
          :key="snap.id"
          class="appItem"
        >
          <div
            class="snap-app"
            @click="openSnap(snap.url, snap.id)"
          >
            <span :class="snap.icon" />
          </div>
        </div>
      </div>
    </div>
    <div class="menu-footer">
      <div
        class="add-button"
        @click="addSnap"
      >
        <i class="fas fa-plus" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  data() {
    return {
      installedSnaps: []
    }
  },
  mounted () {
    this.installedSnaps = this.$DB.installedSnaps
  },
  methods: {
    addSnap () {
      if(this.$VM.currentViewId !== null) {
        this.$VM.setActiveView(null)
      }
      this.$emit('showSnaps')
    },
    openSnap (url, id) {
      this.$VM.setActiveView(id, url)
      this.$emit('hideSnaps')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../globals.scss';
#menu {
  height: 100%;
  background-color: $L_SEA_GREEN;
  padding: 10px 10px 5px 10px;

  .snap-icon {
    height: 6%;
    border-bottom: 1px solid #e6e6e6;
    padding: 5px 0;
    &-image {
      background-color: $WHITE_SMOKE;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.36);
      cursor: pointer;

      &:hover {
        box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.76);
      }
    }
  }
  .installedApps {
    height: 85%;
    padding: 10px 5px;
    .appItem {
      margin: 10px 0;
      .snap-app {
        cursor: pointer;
        display: flex;
        background-color: $WHITE_SMOKE;
        box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.36);
        width: 30px;
        height: 30px;
        border-radius: 50%;
        padding: 5px;

        &:hover {
          box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.76);
        }

        span:before {
          margin: auto;
          font-size: 15pt;
        }
      }
    }
  }
  .menu-footer {
    height: 9%;
    .add-button {
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
