<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '往期科普内容',
  },
}
</route>

<template>
  <div class="past-content">
    <div class="header">
      <text class="title">往期科普内容</text>
    </div>

    <div class="content-list">
      <div
        v-for="(item, index) in pastContents"
        :key="index"
        class="content-item"
        @click="goToDetail(item.id)"
      >
        <image :src="item.coverImage" mode="aspectFill" class="cover-image" />
        <div class="item-info">
          <text class="item-title">{{ item.title }}</text>
          <text class="item-date">{{ item.date }}</text>
        </div>
      </div>
    </div>

    <uni-load-more :status="loadMoreStatus" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { onReachBottom } from '@dcloudio/uni-app'

interface ContentItem {
  id: number
  title: string
  date: string
  coverImage: string
}

const pastContents = ref<ContentItem[]>([])
const loadMoreStatus = ref<'more' | 'loading' | 'noMore'>('more')

const fetchPastContents = async () => {
  // 这里应该调用您的API来获取往期内容
  // 以下是模拟数据
  const newContents: ContentItem[] = [
    {
      id: 1,
      title: '探索太阳系',
      date: '2023-05-01',
      coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
    },
    {
      id: 2,
      title: '黑洞的奥秘',
      date: '2023-04-15',
      coverImage: 'https://img.yzcdn.cn/vant/cat.jpeg',
    },
    // ... 更多内容
  ]

  pastContents.value.push(...newContents)

  if (pastContents.value.length >= 20) {
    // 假设总共有20篇文章
    loadMoreStatus.value = 'noMore'
  }
}

const goToDetail = (id: number) => {
  uni.navigateTo({
    url: `/pages/metesciab/detail?id=${id}`,
  })
}

onMounted(() => {
  fetchPastContents()
})

onReachBottom(() => {
  if (loadMoreStatus.value !== 'noMore') {
    loadMoreStatus.value = 'loading'
    fetchPastContents()
  }
})
</script>

<style lang="scss" scoped>
.past-content {
  min-height: 100vh;
  padding: 30rpx;
  background-color: #f5f5f5;

  .header {
    margin-bottom: 30rpx;

    .title {
      position: relative;
      font-size: 40rpx;
      font-weight: bold;
      color: #333;
      text-align: center;

      &::after {
        position: absolute;
        bottom: -10rpx;
        left: 50%;
        width: 60rpx;
        height: 4rpx;
        content: '';
        background-color: #007aff;
        transform: translateX(-50%);
      }
    }
  }

  .content-list {
    .content-item {
      display: flex;
      margin-bottom: 30rpx;
      overflow: hidden;
      background-color: #fff;
      border-radius: 16rpx;
      box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;

      &:active {
        transform: scale(0.98);
      }

      .cover-image {
        width: 240rpx;
        height: 180rpx;
        object-fit: cover;
      }

      .item-info {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        padding: 20rpx;

        .item-title {
          display: -webkit-box;
          margin-bottom: 10rpx;
          overflow: hidden;
          font-size: 32rpx;
          font-weight: bold;
          line-height: 1.4;
          color: #333;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .item-date {
          font-size: 26rpx;
          color: #999;
        }
      }
    }
  }
}

// 添加加载更多组件的样式
::v-deep .uni-load-more {
  margin-top: 20rpx;
}
</style>
