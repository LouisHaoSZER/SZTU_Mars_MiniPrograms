<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '公告详情',
  },
}
</route>

<template>
  <div class="min-h-screen bg-white font-sans text-gray-800 p-4">
    <h1 class="text-2xl font-bold mb-4">{{ announcement.title }}</h1>
    <p class="text-sm text-gray-600 mb-2">{{ announcement.date }}</p>
    <div class="content">
      <mp-html :content="announcement.content" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html.vue'

interface ContentItem {
  id: number
  title: string
  content: string
  date: string
}

const announcement = ref<ContentItem | null>(null)

const fetchAnnouncementDetail = async (id: number) => {
  // 这里应该调用您的API来获取公告详情
  // 以下是模拟数据
  announcement.value = {
    id,
    title: `公告 ${id}`,
    content: `这是第 ${id} 条公告的详细内容。`,
    date: `2024-06-${(id % 30) + 1}发布`,
  }
}

onMounted(() => {
  // const id = Number(route.params.id)
  fetchAnnouncementDetail(1)
})
</script>
