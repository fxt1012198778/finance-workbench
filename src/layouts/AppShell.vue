<script setup lang="ts">
import { useRoute } from 'vue-router'
import TabBar from '@/components/TabBar.vue'

// W1 D5 · 后台壳：顶栏 + 页签栏 + 左侧菜单 + 内容区
// 尺寸/色值来源：docs/设计稿/README.md「关键设计值」
// 顶栏总高 ≈138 = logo/标题行 93 + 页签栏 32（D5 已加）+ 余量
// D7 待办：F5 刷新页签不丢（localStorage）
const route = useRoute()

// 个人中心课表未排页面（W6 收尾才做），先置灰
const menuItems = [
  { title: '首页', to: '/' },
  { title: '我要办', to: '/handle' },
  { title: '待我办', to: '/todo' },
  { title: '我要查', to: '/query' },
  { title: '我要学', to: '/study' },
  { title: '提醒我', to: '/remind' },
  { title: '个人中心', to: '', disabled: true },
]
</script>

<template>
  <div class="app-shell">
    <!-- 顶栏：logo x=50，标题字号 30 白色（README：平台标题行） -->
    <header class="top-bar">
      <div class="logo">财政</div>
      <h1 class="platform-title">行政办公平台</h1>
      <div class="top-actions">
        <span class="msg" title="消息">消息</span>
        <span class="user">用户</span>
      </div>
    </header>

    <!-- 页签栏：点菜单开页签 / 点 × 关 / 点页签切路由（联动机制见 stores/tabs.ts） -->
    <TabBar />

    <div class="shell-body">
      <!-- 左菜单：宽 126，底色 #7CAEE0 60%，项 79×77 @ x=21，字 18 白 -->
      <aside class="side-menu">
        <ul>
          <li
            v-for="item in menuItems"
            :key="item.title"
            :class="{ active: !item.disabled && route.path === item.to }"
            :style="item.disabled ? { opacity: 0.45, cursor: 'not-allowed' } : undefined"
          >
            <RouterLink v-if="!item.disabled" :to="item.to" class="menu-link">
              {{ item.title }}
            </RouterLink>
            <span v-else>{{ item.title }}</span>
          </li>
        </ul>
      </aside>

      <!-- 内容区：左右边距 52（菜单右缘 126 → 卡片 x=178） -->
      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  /* 锁死一屏：滚动发生在菜单/内容区内部，页面级不出滚动条 */
  height: 100vh;
}

/* ---- 顶栏 ---- */
.top-bar {
  height: 93px;
  flex-shrink: 0;
  background: #0863e6;
  display: flex;
  align-items: center;
  padding: 0 50px;
}

.logo {
  width: 120px;
  height: 56px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.platform-title {
  margin-left: 14px; /* logo 占位 120 + 14 ≈ 设计稿标题 x=384 的相对位置，待真实 logo 位图替换后校准 */
  font-size: 30px;
  font-weight: 600;
  color: #fff;
}

.top-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 24px;
  color: #fff;
  font-size: 16px;
}

.msg {
  cursor: pointer;
}

.user {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

/* ---- 主体 ---- */
.shell-body {
  flex: 1;
  display: flex;
  min-height: 0;
}

.side-menu {
  width: 126px;
  flex-shrink: 0;
  background: rgba(124, 174, 224, 0.6); /* #7CAEE0 60% */
  padding: 24px 0;
  overflow-y: auto; /* 窗口太矮时菜单内部滚 */
}

.side-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.side-menu li {
  width: 79px;
  height: 77px;
  margin: 0 auto 26px; /* 垂直间距 103 = 77 + 26 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
}

.menu-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: inherit;
}

.side-menu li.active {
  height: 85px;
  background: #fff; /* 选中态：白底，文字变蓝 */
  color: #0863e6;
}

/* ---- 内容区 ---- */
.content {
  flex: 1;
  min-width: 0;
  padding: 24px 52px 52px;
  background: #f5f7fa;
  overflow-y: auto; /* 内容区自己滚，顶栏/菜单钉住 */
}
</style>
