<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  layout: 'tabbar',
  style: {
    // navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <div class="min-h-screen bg-gradient font-sans text-gray-800 relative">
    <div class="curved-bg"></div>
    <div class="relative z-10 p-4">
      <header class="flex justify-between items-center mb-6">
        <div class="flex items-center space-x-2 bg-gray-800 rounded-3 p1 px-2">
          <div class="rounded-full bg-white i-carbon-location"></div>
          <span class="font-semibold text-white">深圳·坪山 | 粤</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="rounded-full bg-white text-2xl i-carbon-sun"></div>
          <span class="font-semibold text-white text-2xl">早上好～</span>
        </div>
      </header>

      <div class="bg-white bg-opacity-50 backdrop-blur-md rounded-2xl p-6 mb-6 shadow-lg">
        <div class="flex justify-between items-center mb-4">
          <span class="text-7xl font-bold text-white">29°</span>
          <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <div class="w-10 h-10 bg-white rounded-full"></div>
          </div>
        </div>
        <div class="text-xl mb-2 text-white">阵雨</div>
        <div class="flex justify-between text-sm text-white">
          <span>32° / 27°</span>
          <span>体感温度 32°</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div
          v-for="(item, index) in weatherDetails"
          :key="index"
          class="bg-white bg-opacity-90 rounded-2xl p-4 flex flex-col items-center shadow-md"
        >
          <div :class="['w-8 h-8 rounded-full mb-2', item.color]"></div>
          <span class="text-xs mb-1">{{ item.label }}</span>
          <span class="font-semibold">{{ item.value }}</span>
        </div>
      </div>

      <div class="bg-white bg-opacity-90 rounded-2xl p-4 mb-6 shadow-md">
        <div class="flex justify-between">
          <div
            v-for="(forecast, index) in forecasts"
            :key="index"
            class="flex flex-col items-center"
          >
            <span class="text-sm mb-1">{{ forecast.day }}</span>
            <div :class="['w-8 h-8 rounded-full mb-1', forecast.color]"></div>
            <span class="font-semibold mb-1">{{ forecast.temp }}°</span>
            <span class="text-xs">{{ forecast.wind }}</span>
          </div>
        </div>
      </div>

      <div class="text-xs text-center mb-6 text-gray-600">
        跟踪数据与实际预报数据有偏差，以实际预报数据为准
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'

import { ref } from 'vue'

defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const author = ref('菲鸽')
const description = ref(
  'unibest 是一个集成了多种工具和技术的 uniapp 开发模板，由 uniapp + Vue3 + Ts + Vite4 + UnoCss + UniUI + VSCode 构建，模板具有代码提示、自动格式化、统一配置、代码片段等功能，并内置了许多常用的基本组件和基本功能，让你编写 uniapp 拥有 best 体验。',
)
// 测试 uni API 自动引入
onLoad(() => {
  console.log(author)
})

const weatherDetails = ref([
  { color: 'bg-blue-400', label: '风', value: '南风4级' },
  { color: 'bg-gray-400', label: '云量', value: '98%' },
  { color: 'bg-red-400', label: '气压', value: '994hPa' },
  { color: 'bg-blue-300', label: '降水量', value: '0.8mm/h' },
  { color: 'bg-green-400', label: '湿度', value: '85%' },
  { color: 'bg-yellow-400', label: '能见度', value: '500m' },
])

const forecasts = ref([
  { day: '今天', color: 'bg-yellow-400', temp: 28, wind: '4-5级' },
  { day: '周一', color: 'bg-yellow-300', temp: 29, wind: '4-5级' },
  { day: '周二', color: 'bg-yellow-300', temp: 30, wind: '4-5级' },
  { day: '周三', color: 'bg-gray-400', temp: 31, wind: '4-5级' },
  { day: '周四', color: 'bg-gray-400', temp: 32, wind: '4-5级' },
  { day: '周五', color: 'bg-yellow-400', temp: 33, wind: '4-5级' },
])
</script>

<style>
.main-title-color {
  color: #d14328;
}
.bg-gradient {
  background: #efefef;
}

.curved-bg {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 40vh;
  /* background-color: #3b3cc0; */
  background: linear-gradient(to bottom, #3b3cc0, #4a6ebd);
  border-bottom-right-radius: 100% 60%;
  border-bottom-left-radius: 100% 60%;
}
</style>
