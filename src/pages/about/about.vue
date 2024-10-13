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
    <QiunLoading></QiunLoading>
  </view>
</template>

<script>
// 下面是演示数据，您的项目不需要引用，数据需要您从服务器自行获取
import QiunLoading from '@/components/qiun-loading/qiun-loading.vue'
import demodata from './demodata.json'

export default {
  data() {
    return {
      chartsDataLine1: {},
      chartsDataColumn2: {},
      chartData: {},
      // 这里的 opts 是图表类型 type="radar" 的全部配置参数，您可以将此配置复制到 config-ucharts.js 文件中下标为 ['radar'] 的节点中来覆盖全局默认参数。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
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
      },
    }
  },
  onLoad() {
    // 模拟从服务器获取数据
    this.getServerData1()
    this.getServerData2()
  },
  methods: {
    getServerData1() {
      setTimeout(() => {
        // 因部分数据格式一样，这里不同图表引用同一数据源的话，需要深拷贝一下构造不同的对象
        // 开发者需要自行处理服务器返回的数据，应与标准数据格式一致，注意series的data数值应为数字格式
        this.chartsDataLine1 = JSON.parse(JSON.stringify(demodata.Line))
        this.chartsDataColumn2 = JSON.parse(JSON.stringify(demodata.Column))
      }, 1500)
    },
    getServerData2() {
      // 模拟从服务器获取数据时的延时
      setTimeout(() => {
        // 模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        const res = {
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
        this.chartData = JSON.parse(JSON.stringify(res))
      }, 500)
    },
  },
}
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
