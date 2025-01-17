<template>
  <div class="brand">ChenSino家庭云提供服务</div>
  <div class="container">
    <div class="header">
      <div class="header-child">
        <span class="notification">{{ notificationMsg }}</span>
      </div>
      <div class="header-child">
        <el-input v-model.trim="searchText" @input="getList" :autofocus="true" :suffix-icon="Search" />
      </div>
    </div>

    <div class="main">
      <a v-for="(item, index) in iconShowList" :key="index" target="_blank" :href="item.url" class="animate__animated "
        :class="{
          animate__jello: currentIndex === index
        }" @mouseover="handleMouseOver(index)" @mouseout="handleMouseOut" :style="{ 'background-color': item.color }">
        <font-awesome-icon :icon="item.icon" size="lg" />
        <span class="title">{{ item.title }}</span>
      </a>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { links } from './links'
import type { Item } from '@/api/Item'
import { Search } from '@element-plus/icons-vue'
// 定义响应式的状态变量
const currentIndex = ref(-1)
const searchText = ref('')
const notificationMsg = ref('')
const iconShowList = ref<Item[]>([])
const iconList = ref(links)

// 组件挂载时初始化图标列表
onMounted(() => {
  iconShowList.value = iconList.value
})

// 根据搜索值获取过滤后的列表
const getList = (val: string) => {
  if (val) {
    iconShowList.value = iconList.value.filter((item) => {
      val = val.toLowerCase()
      return item.title.toLowerCase().includes(val) || item.pinyin.toLowerCase().includes(val)
    })
  } else {
    iconShowList.value = iconList.value
  }
}

// 鼠标悬停事件处理方法
const handleMouseOver = (index: number) => {
  currentIndex.value = index
}

const handleMouseOut = () => {
  currentIndex.value = -1
}
</script>

<style scoped lang="less">
.container {
  align-items: center;
  height: 90vh;

  .header {
    display: flex;
    flex-direction: column;
    /* 子元素垂直排列 */
    align-items: center;
    /* 水平居中对齐 */
    justify-content: center;
    /* 如果需要垂直居中对齐 */
    width: 100%;
    /* 确保父容器有足够的宽度 */
    box-sizing: border-box;
    /* 避免边框和内边距影响宽度 */

  }

  .main {
    width: 90%; // 设置为90%，留出一些边缘空间，同时适应大屏幕
    max-width: 1200px; // 设定最大宽度，防止内容过宽
    margin: 3% auto; // 居中对齐
    padding: 0; // 移除默认内边距
    display: grid;
    gap: 0.5em; // 增加间距，使其更易点击/触摸

    a:hover {
      border: 0.2rem solid #75e20f;
      border-radius: 0.5rem;
      padding: 0.1rem;
      opacity: 0.6;
    }

    a {
      border-radius: 0.5rem;
      box-sizing: border-box;
      padding: 0.5rem;
      text-align: center;
      text-decoration: none;

      white-space: nowrap;
      font-size: clamp(1rem, 2vw, 1.5rem);
      overflow: hidden; // 确保内容不会溢出容器
      text-overflow: ellipsis; // 当内容超出时显示省略号
      max-width: 100%; // 确保元素不会超过其分配的空间
      flex-grow: 1; // 允许元素扩展以填充可用空间
      flex-shrink: 0; // 防止元素缩小
      flex-basis: 0; // 初始大小为0，让flex-grow生效
      display: flex;
      flex-direction: column;
      justify-content: center; // 内容垂直居中
      align-items: center; // 内容水平居中
      color: #ffffff;

      .title {
        display: block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 1rem;
        margin-top: 4%;
      }
    }
  }
}


/* 默认布局为4列 */
@media (min-width: 768px) {
  .brand {
    position: absolute;
    top: 2%;
    left: 2%;
    font-size: large;
  }

  // 调整断点到平板电脑的最小宽度
  .main {
    grid-template-columns: repeat(4, 1fr);

    a {
      font-size: clamp(1rem, 2vw, 1.5rem); // 适配大屏幕字体大小
      // 设置响应式高度
      height: clamp(80px, 12vh, 150px); // 最小80px，最大150px，基于视窗高度动态调整
    }
  }

  .header-child {
    width: 50%;
    /* 让每个子 div 占满整行 */
    box-sizing: border-box;
    /* 确保 padding 和 border 不会增加宽度 */
    margin-top: 8px;
    /* 可选：为子元素之间添加间距 */
    margin-bottom: 8px;

    /* 可选：为子元素之间添加间距 */
    .notification {
      color: #13be60;
      font-size: 1.2rem;
    }
  }

}

/* 手机和平板优化 */
@media (max-width: 767px) {
  .brand {
    position: absolute;
    top: 2%;
    left: 2%;
    font-size: 0.8rem;
  }

  .main {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); // 每个元素至少100px宽，最多占一格

    a {
      font-size: clamp(0.9rem, 10vw, 1.2rem); // 适配小屏幕字体大小
      height: clamp(60px, 10vh, 120px); // 小屏幕上的高度范围
    }
  }

  .header-child {
    width: 90%;
    margin-top: 3%;
    /* 让每个子 div 占满整行 */
    box-sizing: border-box;
    /* 确保 padding 和 border 不会增加宽度 */


    /* 可选：为子元素之间添加间距 */
    .notification {
      color: #13be60;
      font-size: 1.2rem;
    }
  }

}
</style>
