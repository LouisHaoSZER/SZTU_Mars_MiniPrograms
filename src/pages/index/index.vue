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
        <div
          class="flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-3 p1 px-2"
        >
          <div class="rounded-full bg-white bg-opacity-70 i-carbon-location"></div>
          <span class="font-semibold text-white">深圳·坪山 | 粤</span>
        </div>
        <div
          class="flex items-center space-x-2 gap-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-3 p1 px-2"
        >
          <image
            :src="`/static/icons/${todayWeather.icon}.svg`"
            mode="aspectFit"
            class="w-5 h-5 bg-orange-400 p1 bg-opacity-70 rounded-full"
          />
          <span class="font-semibold text-white text-1xl">{{ greeting }}</span>
        </div>
      </header>

      <div class="bg-white bg-opacity-50 backdrop-blur-md rounded-2xl p-6 mb-6 shadow-lg">
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center">
            <span class="text-7xl font-bold text-white mr-4">{{ weatherData.now.temp }}°C</span>
          </div>
          <div
            class="w-20 h-20 bg-white bg-opacity-30 rounded-full flex items-center justify-center"
          >
            <image
              :src="`/static/icons/${weatherData.now.icon}.svg`"
              mode="aspectFit"
              class="w-16 h-16"
            />
          </div>
        </div>
        <div class="text-xl mb-2 text-white">{{ weatherData.now.text }}</div>
        <div class="flex justify-between text-sm text-white">
          <span>{{ weatherData.now.temp }}°C / {{ weatherData.now.dew }}°C</span>
          <span>体感温度 {{ weatherData.now.feelsLike }}°C</span>
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

      <div class="bg-white bg-opacity-90 rounded-2xl p-4 mb-6 shadow-md overflow-x-auto">
        <div class="flex space-x-4 min-w-max">
          <div
            v-for="(forecast, index) in forecasts"
            :key="index"
            class="flex flex-col items-center min-w-[60px]"
          >
            <span class="text-sm mb-1">{{ forecast.fxDate.slice(5, 10) }}</span>
            <!-- TODO:要根据时间判断白天还是晚上 -->
            <image
              :src="`/static/icons/${forecast.iconDay}.svg`"
              mode="aspectFit"
              class="w-8 h-8 mb-1"
            />
            <span class="font-semibold mb-1">
              {{ forecast.tempMax }}°C / {{ forecast.tempMin }}°C
            </span>
            <span class="text-xs text-center">
              {{ forecast.windDirDay }}{{ forecast.windScaleDay }}级
            </span>
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
const author = ref('菲鸽')
const time = ref(new Date().toLocaleTimeString())
const greeting = ref('早上好，新的一天开始了～')
// 测试 uni API 自动引入
onLoad(() => {
  console.log(author)
  greeting.value = getTimeGreeting(time.value)
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

const symbolMap = new Map([
  ['风', '级'],
  ['云量', '%'],
  ['气压', '百帕'],
  ['降水量', '毫米'],
  ['湿度', '%'],
  ['能见度', '公里'],
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

// 未来天气预报
const forecasts = ref<fData[]>([])

// 今日天气
const todayWeather = ref({
  temp: '暂无数据～',
  text: '暂无数据～',
  feelsLike: '暂无数据～',
  dew: '暂无数据～',
  icon: '101',
})

// 请求数据部分
// 获取气象数据
const {
  loading: weatherLoading,
  error: weatherError,
  data: weatherData,
  run: getWeatherData,
} = useWeatherRequest(
  () => httpGet('/weather/now', { location: '101280601', key: '654c5a64fedd4c03be8403a5ddab4d35' }),
  { immediate: true },
)

// 天气预警
const {
  loading: weatherWarningLoading,
  error: weatherWarningError,
  data: weatherWarningData,
  run: getWeatherWarningData,
} = useWeatherRequest(() =>
  httpGet('/warning/now', { location: '101280601', key: '654c5a64fedd4c03be8403a5ddab4d35' }),
)

// 未来天气预报
const {
  loading: futureWeatherLoading,
  error: futureWeatherError,
  data: futureWeatherData,
  run: getFutureWeatherData,
} = useWeatherRequest(
  () => httpGet('/weather/7d', { location: '101280601', key: '654c5a64fedd4c03be8403a5ddab4d35' }),
  { immediate: true },
)

// 监听天气数据变化，更新天气详情
watch(weatherData, () => {
  // 今日天气数据
  const jsonWeatherData = JSON.parse(JSON.stringify(weatherData.value)) as WeatherData
  weatherDetails.value.forEach((item) => {
    const key = api2dataMap.get(item.label)
    item.value = jsonWeatherData?.now[key] + symbolMap.get(item.label)
  })
})

// 监听未来天气预报数据变化，更新未来天气预报
watch(futureWeatherData, () => {
  const jsonFutureWeatherData = JSON.parse(
    JSON.stringify(futureWeatherData.value),
  ) as FutureWeatherData
  forecasts.value = jsonFutureWeatherData.daily
})

// 判断时段
const getTimeGreeting = (time: string) => {
  const hour = parseInt(time.split(':')[0])
  if (hour >= 6 && hour < 12) {
    return '早上好，新的一天开始了～'
  } else if (hour >= 12 && hour < 18) {
    return '下午好，再坚持一下，就到下班时间了～'
  } else {
    return '晚上好，好好休息一下吧～'
  }
}
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
