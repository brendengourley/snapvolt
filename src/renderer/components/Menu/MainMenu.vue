<template>
  <div id="menu">
    <div class="snap-icon">
      <img
        class="snap-icon-image"
        src="@/renderer/assets/icon.svg"
        alt="electron-vue"
      >
    </div>
    <div class="installedApps" />
    <div class="menu-footer">
      <div class="add-button" @click="addSnap">
        <i class="fas fa-plus" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  methods: {
    addSnap () {
      this.$VM.setActiveView(null)
      this.$emit('showSnaps')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../globals.scss';
#menu {
  height: 100%;
  background-color: $L_SEA_GREEN;
  padding: 20px 10px 5px 20px;

  .snap-icon {
    height: 10%;
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
    }
  }
  .installedApps {
    height: 85%;
  }
  .menu-footer {
    height: 5%;
    .add-button {
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
