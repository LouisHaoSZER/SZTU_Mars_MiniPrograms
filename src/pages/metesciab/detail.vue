<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '科普详情',
  },
}
</route>

<template>
  <div class="min-h-screen bg-white font-sans text-gray-800 p-4">
    <h1 class="text-2xl font-bold mb-4">{{ metesciab.title }}</h1>
    <p class="text-sm text-gray-600 mb-2">{{ metesciab.date }}</p>
    <div class="content">
      <mp-html :content="metesciab.content" />
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

const metesciab = ref<ContentItem | null>(null)

const fetchMetesciabDetail = async (id: number) => {
  // 这里应该调用您的API来获取公告详情
  // 以下是模拟数据
  metesciab.value = {
    id,
    title: `科普 ${id}`,
    content: `这是第 ${id} 条科普的详细内容。<br/> <div>&nbsp;&nbsp;猫猫<img src="https://img.yzcdn.cn/vant/cat.jpeg"/></div>`,
    date: `2024-06-${(id % 30) + 1}发布`,
  }
}

onMounted(() => {
  // const id = Number(route.params.id)
  fetchMetesciabDetail(1)
})
</script>
