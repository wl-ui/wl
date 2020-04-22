<template>
  <div id="app">
    <el-row class="row-box">
      <el-col :span="12">
        <wl-add @click="wlAddClick()">按 钮</wl-add>
      </el-col>
      <el-col :span="8">
        <wl-input required number v-model="inputNum" placeholder="请分别输入数字和其他字符试试"></wl-input>
      </el-col>
    </el-row>
    <!-- 滑出式侧边栏 -->
    <wl-fade-in :show="layout.fadein">
      <template #header>这里是标题</template>
      这里是内容
      <template #footer>
        <el-button @click="layout.fadein = false">取 消</el-button>
        <wl-add @click="layout.fadein = false">确 定</wl-add>
      </template>
    </wl-fade-in>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      layout: {
        fadein: false
      }, // 视图管理
      inputNum: "" // 带验证的输入框值
    };
  },
  methods: {
    // 防抖点击事件
    wlAddClick() {
      console.log("防抖点击");
      this.layout.fadein = true;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.row-box{
  margin: 120px auto 0;
  width: 800px;
  text-align: center;
}
</style>
