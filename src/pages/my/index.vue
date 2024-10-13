<route lang="json5" type="page">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '我的',
  },
}
</route>

<template>
  <div class="min-h-screen bg-gradient font-sans text-gray-800 relative">
    <div class="curved-bg"></div>
    <div class="relative z-10 p-4">
      <header class="flex justify-between items-center mb-6">
        <div class="flex items-center space-x-2 bg-gray-800 rounded-3 p1 px-2">
          <div class="rounded-full bg-white i-carbon-location"></div>
          <span class="font-semibold text-white">深圳·坪山 | 粤</span>
        </div>
      </header>
      <wd-card v-for="(item, index) in pastContents" :key="index" :title="item.title">
        {{ item.content }}
        <template #footer>
          <text class="date">{{ item.date }}</text>
        </template>
      </wd-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
//
interface ContentItem {
  id: number
  title: string
  content: string
  date: string
}

const pastContents = ref<ContentItem[]>([])
const loadMoreStatus = ref<'more' | 'loading' | 'noMore'>('more')

const fetchMoreContents = async () => {
  // 这里应该调用您的API来获取往期内容
  // 以下是模拟数据
  const newContents: ContentItem[] = [
    {
      id: 1,
      title: '[重要信息:高温酷暑]',
      content:
        '一般的，检举内容由承办的党的委员会或纪律检查委员会将处理意见或复议、复查结论同申诉人见面，听取其意见。复议、复查的结论和决定，应交给申诉人一份。',
      date: '气象研究工作室2024-06-21发布',
    },
    {
      id: 2,
      title: '[重要信息:高温酷暑]',
      content:
        '一般的，检举内容由承办的党的委员会或纪律检查委员会将处理意见或复议、复查结论同申诉人见面，听取其意见。复议、复查的结论和决定，应交给申诉人一份。',
      date: '气象研究工作室2024-06-21发布',
    },
    // ... 更多内容
  ]

  pastContents.value.push(...newContents)

  if (pastContents.value.length >= 20) {
    // 假设总共有20篇文章
    loadMoreStatus.value = 'noMore'
  }
}
onMounted(() => {
  fetchMoreContents()
})

onReachBottom(() => {
  if (loadMoreStatus.value !== 'noMore') {
    loadMoreStatus.value = 'loading'
    fetchMoreContents()
  }
})
</script>

<style lang="scss" scoped>
//背景css类
.bg-gradient {
  background: linear-gradient(to bottom, #3b3cc0 30%, #efefef 30%);
}

.curved-bg {
  position: absolute;
  top: 30%;
  right: 0;
  left: 0;
  height: 100px;
  /* background-color: #3b3cc0; */
  background: linear-gradient(to bottom, #3b3cc0, #4a6ebd);
  border-bottom-right-radius: 100% 60%;
  border-bottom-left-radius: 100% 60%;
  transform: translateY(-50%);
}

// 日期css类
.date {
  font-size: 12px;
  color: #999;
}
</style>
