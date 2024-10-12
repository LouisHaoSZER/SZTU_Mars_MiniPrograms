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
      <wd-card title="[重要信息:高温酷暑]">
        一般的，检举内容由承办的党的委员会或纪律检查委员会将处理意见或复议、复查结论同申诉人见面，听取其意见。复议、复查的结论和决定，应交给申诉人一份。
        <template #footer>
          <text class="date">气象研究工作室2024-06-21发布</text>
        </template>
      </wd-card>
      <wd-card title="[重要信息:高温酷暑]">
        一般的，检举内容由承办的党的委员会或纪律检查委员会将处理意见或复议、复查结论同申诉人见面，听取其意见。复议、复查的结论和决定，应交给申诉人一份。
        <template #footer>
          <text class="date">气象研究工作室2024-06-21发布</text>
        </template>
      </wd-card>
      <wd-card title="[重要信息:高温酷暑]">
        一般的，检举内容由承办的党的委员会或纪律检查委员会将处理意见或复议、复查结论同申诉人见面，听取其意见。复议、复查的结论和决定，应交给申诉人一份。
        <template #footer>
          <text class="date">气象研究工作室2024-06-21发布</text>
        </template>
      </wd-card>
      <wd-card title="[重要信息:高温酷暑]">
        一般的，检举内容由承办的党的委员会或纪律检查委员会将处理意见或复议、复查结论同申诉人见面，听取其意见。复议、复查的结论和决定，应交给申诉人一份。
        <template #footer>
          <text class="date">气象研究工作室2024-06-21发布</text>
        </template>
      </wd-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
//
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
