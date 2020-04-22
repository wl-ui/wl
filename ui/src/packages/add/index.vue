
<template>
  <el-button :type="type" :icon="icon" @click="submitAdd()" v-loading="loading">
    <slot>确 定</slot>
  </el-button>
</template>

<script>
import { throttle } from "wl-core";

export default {
  name: "wl-add",
  props: {
    // loading管理
    loading: {
      type: Boolean,
      default: false
    },
    // 类型
    type: {
      type: String,
      default: "primary"
    },
    icon: {
      type: String,
      default: ""
    }
  },
  methods: {
    submitAdd: throttle(function() {
      this.$emit("click");
    }, 1000)
  }
};
</script>

<style lang="scss">
.ft-scroll {
  flex: 1;
  > .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>