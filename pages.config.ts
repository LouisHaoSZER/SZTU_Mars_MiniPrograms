import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'unibest',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    autoscan: true,
    custom: {
      // '^fg-(.*)': '@/components/fg-$1.vue',
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  tabBar: {
    custom: true,
    color: '#999999',
    selectedColor: '#018d71',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      // 注意tabbar路由需要使用 layout:tabbar 布局
      {
        pagePath: 'pages/index/index',
        text: '天气',
        icon: 'i-carbon-sun',
        iconType: 'unocss',
      },
      {
        pagePath: 'pages/about/about',
        text: '数据可视',
        icon: 'i-carbon-cloud-data-ops',
        iconType: 'unocss',
      },
      {
        pagePath: 'pages/my/index',
        text: '公告',
        icon: 'i-carbon-show-data-cards',
        iconType: 'unocss',
      },
      {
        pagePath: 'pages/metesciab/index',
        text: '气象科普',
        icon: 'i-carbon-help',
        iconType: 'unocss',
      },
    ],
  },
})
