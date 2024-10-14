<route lang="json5">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '关于',
  },
}
</route>

<template>
  <view class="content">
    <qiun-title-bar title="未来某段时间内的降水量" />
    <view class="charts-box">
      <!-- 注意：因app端通过组件均不能传递function类型参数，组件内所有formatter方法，均需使用format属性指定config-echarts.js里事先定义好的formatter的key值，组件会自动匹配与其对应的function -->
      <!-- tooltip的format需要在组件的props参数上传递，例如tooltipFormat="tooltipDemo1"，并需要在config-echarts.js中的formatter节点中的tooltipDemo1中配置format方法。如果开启了echarts，则需要在config-echarts.js中的formatter节点中的tooltipDemo1中配置format方法。 -->
      <qiun-data-charts
        type="column"
        :echartsH5="true"
        :echartsApp="true"
        :chartData="chartsDataLine1"
        tooltipFormat="tooltipDemo1"
      />
    </view>
    <qiun-title-bar title="未来某段时间内的最高温和最低温" />
    <view class="charts-box">
      <!-- 需要把echarts文档内的formatter转成format，对应的'legendFormat'这个字符串为config-echarts.js中的formatter节点中的 legendFormat 方法-->
      <qiun-data-charts
        type="line"
        :echartsH5="true"
        :echartsApp="true"
        :eopts="{ legend: { format: 'legendFormat' } }"
        :chartData="chartsDataColumn2"
      />
    </view>
    <view class="charts-box">
      <qiun-title-bar title="未来某段时间内的风向图" />
      <qiun-data-charts type="radar" :opts="opts" :chartData="chartData" />
    </view>
    <wd-button @click="getWeatherData">获取气象数据</wd-button>
    <wd-button @click="getWeatherWarningData">获取预警状态</wd-button>
    <wd-button @click="getFutureWeatherData">获取未来天气预报</wd-button>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import demodata from './demodata.json'
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

// 天气预警
const {
  loading: weatherWarningLoading,
  error: weatherWarningError,
  data: weatherWarningData,
  run: getWeatherWarningData,
} = useRequest(() =>
  httpGet('/warning/now', { location: '101010100', key: '654c5a64fedd4c03be8403a5ddab4d35' }),
)

// 未来天气预报
const {
  loading: futureWeatherLoading,
  error: futureWeatherError,
  data: futureWeatherData,
  run: getFutureWeatherData,
} = useRequest(() =>
  httpGet('/weather/7d', { location: '101010100', key: '654c5a64fedd4c03be8403a5ddab4d35' }),
)

// 图表配置部分
interface ChartData {
  categories: string[]
  series: Array<{
    name: string
    data: number[]
  }>
}

const chartsDataLine1 = ref<ChartData>({} as ChartData)
const chartsDataColumn2 = ref<ChartData>({} as ChartData)
const chartData = ref<ChartData>({} as ChartData)

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

const getServerData1 = () => {
  setTimeout(() => {
    chartsDataLine1.value = JSON.parse(JSON.stringify(demodata.Line))
    chartsDataColumn2.value = JSON.parse(JSON.stringify(demodata.Column))
  }, 1500)
}

const getServerData2 = () => {
  setTimeout(() => {
    const res: ChartData = {
      categories: ['维度1', '维度2', '维度3', '维度4', '维度5', '维度6'],
      series: [
        {
          name: '成交量1',
          data: [90, 110, 165, 195, 187, 172],
        },
        {
          name: '成交量2',
          data: [190, 210, 105, 35, 27, 102],
        },
      ],
    }
    chartData.value = JSON.parse(JSON.stringify(res))
  }, 500)
}

onMounted(() => {
  getServerData1()
  getServerData2()
})
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
