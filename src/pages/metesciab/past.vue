<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '往期科普内容',
  },
}
</route>

<!-- TODO: 抽象为滚动栏组件，即使用者只用通过slot传入信息栏即可自由控制样式 -->
<template>
  <view class="content">
    <z-paging ref="paging" v-model="dataList" @query="queryList">
      <template #top>
        <view class="header">
          <text class="title">往期科普内容</text>
          <z-tabs :list="tabList" @change="tabsChange" class="tabs" />
        </view>
      </template>

      <template #refresher="{ refresherStatus }">
        <custom-refresher :status="refresherStatus" />
      </template>

      <template #loadingMoreNoMore>
        <custom-nomore />
      </template>

      <view class="item-list">
        <view class="item" v-for="(item, index) in dataList" :key="index" @click="itemClick(item)">
          <view class="item-content">
            <text class="item-title">{{ item.title }}</text>
            <span class="flex items-center justify-around">
              <text class="item-detail">{{ item.detail }}</text>
              <icon class="i-carbon-chevron-right text-gray-400 text-xl" />
            </span>
          </view>
        </view>
      </view>
    </z-paging>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 定义数据类型
interface ListItem {
  title: string
  detail: string
}

// v-model绑定的这个变量不要在分页请求结束中自己赋值！！！
const dataList = ref<ListItem[]>([])
const tabList = ref(['测试1', '测试2', '测试3', '测试4'])
const tabIndex = ref(0)
const paging = ref()

const tabsChange = (index: number) => {
  tabIndex.value = index
  // 当切换tab或搜索时请调用组件的reload方法，请勿直接调用：queryList方法！！
  // 调用reload时参数传true则代表reload时触发下拉刷新效果，不传或false则代表取消此效果
  paging.value.reload(true)
}

const queryList = (pageNo: number, pageSize: number) => {
  // 组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
  // 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
  // 模拟请求服务器获取分页数据，请替换成自己的网络请求
  const params = {
    pageNo,
    pageSize,
    type: tabIndex.value + 1,
  }
  request()
    .queryList(params)
    .then((res) => {
      // 将请求的结果数组传递给z-paging
      paging.value.complete(res.data.list)
    })
    .catch(() => {
      // 如果请求失败写paging.value.complete(false);
      // 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
      // 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
      paging.value.complete(false)
    })
}

const request = () => {
  return {
    queryList: (params: { pageNo: number; pageSize: number; type: number }) => {
      return new Promise<{ data: { list: ListItem[] } }>((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              list: [
                { title: '焚风效应是什么？', detail: '详情' },
                { title: '雨影效应是什么？', detail: '详情' },
                { title: '回南天是什么？', detail: '详情' },
                { title: '梅雨是什么？', detail: '详情' },
                { title: '龙卷风如何形成？', detail: '详情' },
                { title: '什么是厄尔尼诺现象？', detail: '详情' },
                { title: '霜冻是如何产生的？', detail: '详情' },
                { title: '酸雨的成因是什么？', detail: '详情' },
                { title: '什么是热岛效应？', detail: '详情' },
                { title: '极光是如何形成的？', detail: '详情' },
              ],
            },
          })
        }, 1000)
      })
    },
  }
}

const itemClick = (item: ListItem) => {
  console.log('点击了', item.title)
}
</script>

<style lang="scss" scoped>
.content {
  background-color: #f5f5f5;
}

.header {
  padding: 20rpx 30rpx;
  background-color: #ffffff;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.title {
  margin-bottom: 20rpx;
  font-size: 36rpx;
  font-weight: bold;
}

.tabs {
  margin-top: 10rpx;
}

.item-list {
  padding: 20rpx;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  margin-bottom: 20rpx;
  background-color: #ffffff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.item-content {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
}

.item-title {
  margin-bottom: 10rpx;
  font-size: 32rpx;
  font-weight: 500;
  color: #333333;
}

.item-detail {
  font-size: 28rpx;
  color: #999999;
}
</style>
