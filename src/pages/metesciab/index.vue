<route lang="json5" type="page">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '气象科普',
  },
}
</route>

<template>
  <div class="min-h-screen bg-gradient font-sans text-gray-800 relative">
    <div class="curved-bg"></div>
    <!-- 科普卡片部分 -->
    <div class="relative z-10 p-4">
      <header class="flex justify-between items-center mb-6">
        <div class="flex items-center space-x-2 bg-gray-800 rounded-3 p1 px-2">
          <div class="rounded-full bg-white i-carbon-location"></div>
          <span class="font-semibold text-white">深圳·坪山 | 粤</span>
        </div>
      </header>
      <div class="m5 text-black bg-white p3 rounded-xl">
        <div class="m4">
          <text class="title center">第一期气象小科普</text>
        </div>
        <mp-html :content="mdText" />
        <div class="footer">
          工作室重大天气发布网站：
          <br />
          http://119.23.41.163/index.php/sztumrs/forecast
        </div>
      </div>
      <!-- 跳转长按钮 -->
      <div class="px-4 mt-4">
        <button
          @click="goToPast"
          class="w-full bg-blue-700 text-white py-2 px-4 rounded-full flex justify-between items-center transition duration-300 ease-in-out hover:bg-blue-800 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <span class="font-semibold">往期科普</span>
          <!-- TODO: Bug：图标不显示 -->
          <view class="carbon:caret-right text-red"></view>
          <div class="carbon:caret-right text-red"></div>
          <div class="carbon:caret-right text-red"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html.vue'

// 富文本内容
const mdText = ref(
  '   <h3>气象小科普</h3><br/> <div>&nbsp;&nbsp;猫猫<img src="https://img.yzcdn.cn/vant/cat.jpeg"/></div>',
)

// 跳转页面
const goToPast = () => {
  uni.navigateTo({
    url: '/pages/metesciab/past',
  })
}
</script>

<style lang="scss" scoped>
//背景css类
.bg-gradient {
  background: linear-gradient(to bottom, #3b3cc0 30%, #efefef 30%);
}

.curved-bg {
  position: absolute;
  top: 30%;
  right: 0;
  left: 0;
  height: 100px;
  /* background-color: #3b3cc0; */
  background: linear-gradient(to bottom, #3b3cc0, #4a6ebd);
  border-bottom-right-radius: 100% 60%;
  border-bottom-left-radius: 100% 60%;
  transform: translateY(-50%);
}

// 日期css类
.date {
  font-size: 12px;
  color: #999;
}

// title css类
.title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

// 尾言css类
.footer {
  margin-top: 10px;
  font-size: 12px;
  color: #999;
}

// 添加按钮样式
button {
  transition: all 0.3s ease;

  &:hover {
    box-shadow:
      0 4px 6px rgba(50, 50, 93, 0.11),
      0 1px 3px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
}
</style>
