<template>
  <view class="my-search-container"
        :style="{ 'background-color' : bgColor }"
        @click="searchBoxHandler">
    <view class="my-search-box" :style="{ 'border-radius' : radius+'px' }" >
      <uni-icons type="search"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    // 背景颜色
    bgColor: {
      type: String,
      default: '#C00000'
    },
    // 圆角尺寸
    radius: {
      type: Number,
      default: 18 // px
    }
  },
  data() {
    return {}
  },
  methods: {
    searchBoxHandler() {
      this.$emit('click')
    },
  }
}
</script>

<style lang="scss" scoped>
.my-search-container {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 10px;

  .my-search-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 36px;
    background-color: #FFFFFF;

    .placeholder {
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>
