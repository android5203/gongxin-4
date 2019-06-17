<template>
  <i :class="['iconfont', 'icon-'+ type]" :style="{'font-size': size+'px', 'color': color}"></i>
</template>

<script>
import "../assets/fonts/iconfont.css";
export default {
  props: {
    type: {
      type: String,
      default: "icon_shiyongwendang"
    },
    size: {
      type: Number,
      default: 16
    },
    color: {
      type: String,
      default: "#000"
    }
  }
};
</script>

<style lang="less" scoped>
</style>