<route lang="json5" type="page">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '公告',
    enablePullDownRefresh: true,
  },
}
</route>

<template>
  <div class="min-h-screen bg-gradient font-sans text-gray-800 relative">
    <div class="curved-bg"></div>
    <div class="relative z-10 p-4 content-container">
      <header class="flex justify-between items-center mb-6">
        <div class="flex items-center space-x-2 bg-gray-800 rounded-3 p1 px-2">
          <div class="rounded-full bg-white i-carbon-location"></div>
          <span class="font-semibold text-white">深圳·坪山 | 粤</span>
        </div>
      </header>
      <div class="card-container">
        <wd-card v-for="(item, index) in pastContents" :key="index" :title="item.title">
          {{ item.content }}
          <template #footer>
            <text class="date">{{ item.date }}</text>
          </template>
        </wd-card>
      </div>
      <!-- 跳转长按钮 -->
      <div v-if="showMoreButton" class="px-4 mt-4">
        <button
          @click="navigateToAllAnnouncements"
          class="w-full bg-blue-700 text-white py-2 px-4 rounded-full flex justify-between items-center transition duration-300 ease-in-out hover:bg-blue-800 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <span class="font-semibold">更多公告</span>
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
import { ref, computed, onMounted } from 'vue'

interface ContentItem {
  id: number
  title: string
  content: string
  date: string
}

const pastContents = ref<ContentItem[]>([])
const showMoreButton = ref(false)
const page = ref(1)

const fetchMoreContents = async () => {
  // 这里应该调用您的API来获取往期内容
  // 以下是模拟数据
  const newContents: ContentItem[] = [
    {
      id: page.value,
      title: `[公告 ${page.value}]`,
      content: `这是第 ${page.value} 条公告的内容。`,
      date: `2024-06-${20 + page.value}发布`,
    },
  ]

  pastContents.value.push(...newContents)
  page.value++

  if (pastContents.value.length >= 4) {
    showMoreButton.value = true
  }
}

const navigateToAllAnnouncements = () => {
  uni.navigateTo({
    url: '/pages/announcement/past',
  })
}

onMounted(() => {
  fetchMoreContents()
})

// 注册触底加载更多
onReachBottom(() => {
  if (pastContents.value.length < 4) {
    fetchMoreContents()
  }
})
</script>

<style lang="scss" scoped>
.bg-gradient {
  background: #efefef; // 将整体背景色改为浅色
}

.curved-bg {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 40vh;
  background: linear-gradient(to bottom, #3b3cc0, #4a6ebd);
  border-bottom-right-radius: 100% 60%;
  border-bottom-left-radius: 100% 60%;
}

.content-container {
  position: relative;
  z-index: 10;
  min-height: 100vh;
}

.card-container {
  padding-bottom: 20px; // 为底部添加一些间距
}

// 日期css类
.date {
  font-size: 12px;
  color: #999;
}
</style>
