<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,
  },
}
</route>
<template>
  <!-- Unocss存在的Bug，需要提前加载一次资源才能够正常使用 -->
  <!-- i-carbon-wind-gusts -->
  <!-- i-carbon-cloud -->
  <!-- i-carbon-cloud-data-ops -->
  <!-- i-carbon-rain -->
  <!-- i-carbon-humidity -->
  <!-- i-carbon-annotation-visibility -->
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
          <span class="text-7xl font-bold text-white">{{ todayWeather.temp }}°</span>
          <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <div class="w-10 h-10 bg-white rounded-full"></div>
          </div>
        </div>
        <div class="text-xl mb-2 text-white">{{ todayWeather.text }}</div>
        <div class="flex justify-between text-sm text-white">
          <span>{{ todayWeather.temp }} / {{ todayWeather.dew }}</span>
          <span>体感温度 {{ todayWeather.feelsLike }}</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div
          v-for="(item, index) in weatherDetails"
          :key="index"
          class="bg-white bg-opacity-90 rounded-2xl p-4 flex flex-col items-center shadow-md"
        >
          <div
            :class="['w-10 h-10 rounded-full mb-2 flex items-center justify-center', item.color]"
          >
            <div :class="['text-2xl text-white i-carbon-' + item.icon]"></div>
          </div>
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
import { httpGet } from '@/utils/http'
import useWeatherRequest from '@/hooks/useWeatherRequest'

import { ref } from 'vue'

defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const author = ref('菲鸽')

// 测试 uni API 自动引入
onLoad(() => {
  console.log(author)
})

// 接口数据映射表
const api2dataMap = new Map([
  ['风', 'windDir'],
  ['云量', 'cloud'],
  ['气压', 'pressure'],
  ['降水量', 'precip'],
  ['湿度', 'humidity'],
  ['能见度', 'vis'],
])

// 天气详情
const weatherDetails = ref([
  { color: 'bg-blue-400', label: '风', icon: 'wind-gusts', value: '暂无数据～' }, // windDirection + windScale
  { color: 'bg-gray-400', label: '云量', icon: 'cloud', value: '暂无数据～' }, // clound
  { color: 'bg-red-400', label: '气压', icon: 'cloud-data-ops', value: '暂无数据～' }, // pressure
  { color: 'bg-blue-300', label: '降水量', icon: 'rain', value: '暂无数据～' }, // precip
  { color: 'bg-green-400', label: '湿度', icon: 'humidity', value: '暂无数据～' }, // humidity
  { color: 'bg-yellow-400', label: '能见度', icon: 'annotation-visibility', value: '暂无数据～' }, // vis
])

const forecasts = ref([
  { day: '今天', color: 'bg-yellow-400', temp: 28, wind: '4-5级' },
  { day: '周一', color: 'bg-yellow-300', temp: 29, wind: '4-5级' },
  { day: '周二', color: 'bg-yellow-300', temp: 30, wind: '4-5级' },
  { day: '周三', color: 'bg-gray-400', temp: 31, wind: '4-5级' },
  { day: '周四', color: 'bg-gray-400', temp: 32, wind: '4-5级' },
  { day: '周五', color: 'bg-yellow-400', temp: 33, wind: '4-5级' },
])

// 今日天气
const todayWeather = ref({
  temp: '暂无数据～',
  text: '暂无数据～',
  feelsLike: '暂无数据～',
  dew: '暂无数据～',
})

// 请求数据部分
// 获取气象数据
const {
  loading: weatherLoading,
  error: weatherError,
  data: weatherData,
  run: getWeatherData,
} = useWeatherRequest(
  () => httpGet('/weather/now', { location: '101010100', key: '654c5a64fedd4c03be8403a5ddab4d35' }),
  { immediate: true },
)

// 天气预警
const {
  loading: weatherWarningLoading,
  error: weatherWarningError,
  data: weatherWarningData,
  run: getWeatherWarningData,
} = useWeatherRequest(() =>
  httpGet('/warning/now', { location: '101010100', key: '654c5a64fedd4c03be8403a5ddab4d35' }),
)

// 未来天气预报
const {
  loading: futureWeatherLoading,
  error: futureWeatherError,
  data: futureWeatherData,
  run: getFutureWeatherData,
} = useWeatherRequest(() =>
  httpGet('/weather/7d', { location: '101010100', key: '654c5a64fedd4c03be8403a5ddab4d35' }),
)

// 监听天气数据变化，更新天气详情
watch(weatherData, () => {
  const jsonWeatherData = JSON.parse(JSON.stringify(weatherData.value)) as WeatherData
  weatherDetails.value.forEach((item) => {
    const key = api2dataMap.get(item.label)
    item.value = jsonWeatherData.now[key]
  })
  weatherDetails.value[0].value += jsonWeatherData.now.windScale + '级'

  todayWeather.value.temp = jsonWeatherData.now.temp
  todayWeather.value.text = jsonWeatherData.now.text
  todayWeather.value.feelsLike = jsonWeatherData.now.feelsLike
  todayWeather.value.dew = jsonWeatherData.now.dew
})
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
