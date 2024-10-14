<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '往期公告',
    onReachBottomDistance: 50,
  },
}
</route>

<template>
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
                <wd-button type="link" class="text-blue-500">详情</wd-button>
              </div>
            </template>
          </wd-card>
        </transition-group>
      </div>
      <div v-if="loadMoreStatus !== 'noMore'" class="mt-6 text-center">
        <wd-button
          type="primary"
          @click="loadMoreAnnouncements"
          :loading="loadMoreStatus === 'loading'"
        >
          加载更多
        </wd-button>
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

const announcements = ref<ContentItem[]>([])
const searchQuery = ref('')
const loadMoreStatus = ref<'more' | 'loading' | 'noMore'>('more')
const page = ref(1)

const filteredAnnouncements = computed(() => {
  if (!searchQuery.value) return announcements.value
  const query = searchQuery.value.toLowerCase()
  return announcements.value.filter(
    (item) =>
      item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query),
  )
})

const fetchAnnouncements = async () => {
  // 这里应该调用您的API来获取公告
  // 以下是模拟数据
  const newAnnouncements: ContentItem[] = Array.from({ length: 10 }, (_, i) => ({
    id: page.value * 10 + i + 1,
    title: `[公告 ${page.value * 10 + i + 1}]`,
    content: `这是第 ${page.value * 10 + i + 1} 条公告的内容。`,
    date: `2024-06-${((page.value * 10 + i + 1) % 30) + 1}发布`,
  }))

  announcements.value.push(...newAnnouncements)
  page.value++

  if (announcements.value.length >= 50) {
    // 假设总共有50篇公告
    loadMoreStatus.value = 'noMore'
  } else {
    loadMoreStatus.value = 'more'
  }
}

const loadMoreAnnouncements = async () => {
  if (loadMoreStatus.value !== 'noMore') {
    loadMoreStatus.value = 'loading'
    await fetchAnnouncements()
  }
}

const searchAnnouncements = () => {
  // 如果需要，这里可以添加额外的搜索逻辑
}

onMounted(() => {
  fetchAnnouncements()
})

// 注册触底加载更多
onReachBottom(() => {
  if (loadMoreStatus.value === 'more') {
    loadMoreAnnouncements()
  }
})
</script>

<style lang="scss" scoped>
.card-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.date {
  font-size: 12px;
  color: #999;
}
</style>
