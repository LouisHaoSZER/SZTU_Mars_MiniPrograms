<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '往期公告',
    onReachBottomDistance: 50,
  },
}
</route>

<!-- <template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-800">
    <div>
      <div class="mb-6">
        <wd-search
          v-model="searchQuery"
          placeholder="搜索公告"
          @search="searchAnnouncements"
          class="w-full"
        />
      </div>
      <div class="card-container">
        <transition-group name="fade" tag="div">
          <wd-card
            v-for="(item, index) in filteredAnnouncements"
            :key="item.id"
            :title="item.title"
            class="mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div class="p-4">
              {{ item.content }}
            </div>
            <template #footer>
              <div class="flex justify-between items-center p-2 bg-gray-100">
                <text class="date text-sm text-gray-600">{{ item.date }}</text>
                <wd-button type="link" class="text-blue-500" @click="viewDetails(item.id)">
                  详情
                </wd-button>
              </div>
            </template>
          </wd-card>
        </transition-group>
      </div>
      <div v-if="loadMoreStatus !== 'noMore'" class="mt-6 text-center">
        <wd-button
          type="secondary"
          class="custom-button-style"
          @click="loadMoreAnnouncements"
          :loading="loadMoreStatus === 'loading'"
        >
          加载更多
        </wd-button>
      </div>
    </div>
  </div>
</template> -->

<!-- TODO: 抽象为滚动栏组件，即使用者只用通过slot传入信息栏即可自由控制样式 -->
<template>
  <view class="content">
    <z-paging ref="paging" v-model="dataList" @query="queryList">
      <!-- 需要固定在顶部不滚动的view放在slot="top"的view中，如果需要跟着滚动，则不要设置slot="top" -->
      <!-- 注意！此处的z-tabs为独立的组件，可替换为第三方的tabs，若需要使用z-tabs，请在插件市场搜索z-tabs并引入，否则会报插件找不到的错误 -->
      <template #top>
        <view class="header">
          <text class="title">往期公告</text>
          <z-tabs :list="tabList" @change="tabsChange" class="tabs" />
        </view>
      </template>

      <!-- 自定义下拉刷新view(如果use-custom-refresher为true且不设置下面的slot="refresher"，此时不用获取refresherStatus，会自动使用z-paging自带的下拉刷新view) -->

      <!-- 注意注意注意！！字节跳动小程序中自定义下拉刷新不支持slot-scope，将导致custom-refresher无法显示 -->
      <!-- 如果是字节跳动小程序，请参照sticky-demo.vue中的写法，此处使用slot-scope是为了减少data中无关变量声明，降低依赖 -->
      <template #refresher="{ refresherStatus }">
        <!-- 此处的custom-refresh为demo中自定义的组件，非z-paging的内置组件，请在实际项目中自行创建。这里插入什么view，下拉刷新就显示什么view -->
        <custom-refresher :status="refresherStatus" />
      </template>
      <!-- 自定义没有更多数据view -->
      <template #loadingMoreNoMore>
        <!-- 此处的custom-nomore为demo中自定义的组件，非z-paging的内置组件，请在实际项目中自行创建。这里插入什么view，没有更多数据就显示什么view -->
        <custom-nomore />
      </template>

      <!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
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
