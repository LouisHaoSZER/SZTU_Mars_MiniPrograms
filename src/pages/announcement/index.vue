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
      <div v-if="showMoreButton" class="px-4">
        <button
          @click="navigateToAllAnnouncements"
          class="w-full bg-blue-700 text-white py-2 px-4 rounded-full flex justify-between items-center transition duration-300 ease-in-out hover:bg-blue-800 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <span class="font-semibold">更多公告</span>
          <!-- TODO: 等待图标资源 -->
          <div>
            <div class="i-carbon-caret-right text-white text-3xl"></div>
            <div class="i-carbon-caret-right text-white text-2xl"></div>
            <div class="i-carbon-caret-right text-white text-1xl"></div>
          </div>
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

const pastContents = ref<ContentItem[]>([
  {
    id: 1,
    title: '公告 1',
    content:
      '这是第 1 条公告的内容。这是第 1 条公告的内容。这是第 1 条公告的内容。这是第 1 条公告的内容。这是第 1 条公告的内容。这是第 1 条公告的内容。这是第 1 条公告的内容。',
    date: '2024-06-21 发布',
  },
  {
    id: 2,
    title: '公告 2',
    content:
      '这是第 2 条公告的内容。这是第 2 条公告的内容。这是第 2 条公告的内容。这是第 2 条公告的内容。这是第 2 条公告的内容。这是第 2 条公告的内容。这是第 2 条公告的内容。',
    date: '2024-06-22 发布',
  },
])

const showMoreButton = ref(false)
const page = ref(3) // 更新初始页码

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
  padding-bottom: 20px;
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

// 日期css类
.date {
  font-size: 12px;
  color: #999;
}
</style>
