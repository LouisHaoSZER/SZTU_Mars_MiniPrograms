<route lang="json5">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '天气数据可视化',
    enablePullDownRefresh: true,
  },
}
</route>

<template>
  <view class="content">
    <qiun-title-bar title="未来7天时间内的降水量 (单位:mm)" />
    <view class="charts-box">
      <!-- 注意：因app端通过组件均不能传递function类型参数，组件内所有formatter方法，均需使用format属性指定config-echarts.js里事先定义好的formatter的key值，组件会自动匹配与其对应的function -->
      <!-- tooltip的format需要在组件的props参数上传递，例如tooltipFormat="tooltipDemo1"，并需要在config-echarts.js中的formatter节点中的tooltipDemo1中配置format方法。如果开启了echarts，则需要在config-echarts.js中的formatter节点中的tooltipDemo1中配置format方法。 -->
      <qiun-data-charts
        type="column"
        :echartsH5="true"
        :echartsApp="true"
        :chartData="precipLine"
        tooltipFormat="precipDemo"
      />
    </view>
    <qiun-title-bar title="未来7天内的最高温和最低温  (温度单位:°C)" />
    <view class="charts-box">
      <!-- 需要把echarts文档内的formatter转成format，对应的'legendFormat'这个字符串为config-echarts.js中的formatter节点中的 legendFormat 方法-->
      <qiun-data-charts
        type="line"
        :echartsH5="true"
        :echartsApp="true"
        :eopts="{ legend: { format: 'legendFormat' } }"
        :chartData="temperatureColumn"
      />
    </view>
    <view class="charts-box">
      <qiun-title-bar title="今日白天/夜间风向图" />
      <qiun-data-charts type="radar" :opts="opts" :chartData="windDirection" />
    </view>
    <view class="charts-box">
      <qiun-title-bar title="今日风速" />
      <qiun-data-charts type="gauge" :opts="gaugeOpts" :chartData="windSpeed" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { httpGet } from '@/utils/http'

// 请求数据部分
// 获取气象数据
const {
  loading,
  error,
  data,
  run: getWeatherData,
} = useRequest(() =>
  httpGet('/weather/now', { location: '101010100', key: '654c5a64fedd4c03be8403a5ddab4d35' }),
)

// 图表配置部分
interface ChartData {
  categories: any[]
  series: Array<{
    name: string
    data: number[]
  }>
}

const opts = ref({
  timing: 'easeOut',
  duration: 1000,
  rotate: false,
  rotateLock: false,
  color: [
    '#1890FF',
    '#91CB74',
    '#FAC858',
    '#EE6666',
    '#73C0DE',
    '#3CA272',
    '#FC8452',
    '#9A60B4',
    '#ea7ccc',
  ],
  padding: [5, 5, 5, 5],
  fontSize: 13,
  fontColor: '#666666',
  dataLabel: false,
  dataPointShape: true,
  dataPointShapeType: 'solid',
  touchMoveLimit: 60,
  enableScroll: false,
  enableMarkLine: false,
  legend: {
    show: true,
    position: 'right',
    lineHeight: 25,
    float: 'center',
    padding: 5,
    margin: 5,
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'rgba(0,0,0,0)',
    borderWidth: 0,
    fontSize: 13,
    fontColor: '#666666',
    hiddenColor: '#CECECE',
    itemGap: 10,
  },
  extra: {
    radar: {
      gridType: 'radar',
      gridColor: '#CCCCCC',
      gridCount: 3,
      opacity: 0.2,
      max: 200,
      labelShow: true,
      gridEval: 1,
      radius: 0,
      axisLabel: false,
      axisLabelTofix: 0,
      labelColor: '#666666',
      labelPointShow: false,
      labelPointRadius: 3,
      labelPointColor: '#CCCCCC',
      border: false,
      borderWidth: 2,
      linearType: 'none',
    },
    tooltip: {
      showBox: true,
      showArrow: true,
      showCategory: false,
      borderWidth: 0,
      borderRadius: 0,
      borderColor: '#000000',
      borderOpacity: 0.7,
      bgColor: '#000000',
      bgOpacity: 0.7,
      gridType: 'solid',
      dashLength: 4,
      gridColor: '#CCCCCC',
      boxPadding: 3,
      fontSize: 13,
      lineHeight: 20,
      fontColor: '#FFFFFF',
      legendShow: true,
      legendShape: 'auto',
      splitLine: true,
      horizentalLine: false,
      xAxisLabel: false,
      yAxisLabel: false,
      labelBgColor: '#FFFFFF',
      labelBgOpacity: 0.7,
      labelFontColor: '#666666',
    },
  },
})

// 修改 onMounted 钩子
onMounted(async () => {
  await updateFutureWeatherData()
})

// 初始化 precipLine
const precipLine = ref<ChartData>({
  categories: [],
  series: [{ name: '降水量', data: [] }],
})

// 初始化 futureWeatherTemperatureColumn
const temperatureColumn = ref<ChartData>({
  categories: [],
  series: [
    { name: '最高温', data: [] },
    { name: '最低温', data: [] },
  ],
})

const windDirection = ref<ChartData>({
  categories: ['北', '东北', '东', '东南', '南', '西南', '西', '西北'],
  series: [
    { name: '日间风向', data: [] },
    { name: '夜间风向', data: [] },
  ],
})

// 风速仪表盘
const windSpeed = ref<ChartData>({
  categories: [
    { value: 0.2, color: '#1890ff' },
    { value: 0.8, color: '#2fc25b' },
    { value: 1, color: '#f04864' },
  ],
  series: [{ name: '最大风速', data: [] }],
})

// 未来天气预报
const forecasts = ref<fData[]>([])

// 更新未来天气预报数据
async function updateFutureWeatherData() {
  const futureWeatherData = (await httpGet('/weather/7d', {
    location: '101280601',
    key: '654c5a64fedd4c03be8403a5ddab4d35',
  })) as unknown as FutureWeatherData

  forecasts.value = futureWeatherData.daily

  // 降水量柱状图部分
  precipLine.value.categories = forecasts.value.map((item) => item.fxDate.substring(5, 10))
  precipLine.value.series[0].data = forecasts.value.map((item) => Number(item.precip))

  // 高低温曲线部分
  temperatureColumn.value.categories = precipLine.value.categories
  // 最高温

  temperatureColumn.value.series[0].data = forecasts.value.map((item) => Number(item.tempMax))
  temperatureColumn.value.series[0].name = '最高温'
  // 最低温
  temperatureColumn.value.series[1].data = forecasts.value.map((item) => Number(item.tempMin))
  temperatureColumn.value.series[1].name = '最低温'

  // 风向雷达图部分
  windDirection.value.series[0].data = [Number(forecasts.value[0].wind360Day)]
  windDirection.value.series[0].name = '日间风向'
  windDirection.value.series[1].data = [Number(forecasts.value[0].wind360Night)]
  windDirection.value.series[1].name = '夜间风向'

  // 风速仪表盘部分
  windSpeed.value.series[0].data = [Number(forecasts.value[0].windSpeedDay) * 0.01]
  console.log(windSpeed.value)
}

const gaugeOpts = ref({})

// 风速仪表盘配置
watch(
  () => forecasts.value[0].windSpeedDay,
  (newVal) => {
    gaugeOpts.value = {
      color: [
        '#1890FF',
        '#91CB74',
        '#FAC858',
        '#EE6666',
        '#73C0DE',
        '#3CA272',
        '#FC8452',
        '#9A60B4',
        '#ea7ccc',
      ],
      padding: undefined,
      title: {
        name: `${newVal}Km/H`,
        fontSize: 25,
        color: '#2fc25b',
        offsetY: 50,
      },
      subtitle: {
        name: '实时速度',
        fontSize: 15,
        color: '#666666',
        offsetY: -50,
      },
      extra: {
        gauge: {
          type: 'default',
          width: 30,
          labelColor: '#666666',
          startAngle: 0.75,
          endAngle: 0.25,
          startNumber: 0,
          endNumber: 100,
          labelFormat: '',
          splitLine: {
            fixRadius: 0,
            splitNumber: 10,
            width: 30,
            color: '#FFFFFF',
            childNumber: 5,
            childWidth: 12,
          },
          pointer: {
            width: 24,
            color: 'auto',
          },
        },
      },
    }
  },
)
</script>

<style>
.content {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.charts-box {
  width: 100%;
  height: 300px;
}
</style>
