<script setup lang="ts">
// W1 D4 · 后台壳：顶栏 + 左侧静态菜单 + 内容区
// 尺寸/色值来源：docs/设计稿/README.md「关键设计值（D4 AppShell 直接抄）」
// 页签栏（顶栏下方 h=32）是 D5 的活；5 个路由空页面 D6 再建，菜单先静态。
// 顶栏总高 ≈138 含页签区；D4 先做 93px 的 logo/标题行，页签栏 D5 补上后凑足 138。
const menuItems = ['首页', '我要办', '待我办', '我要查', '我要学', '提醒我', '个人中心']
// 静态选中态占位；D6 建完路由后改成由 route.name 驱动
const activeIndex = 0
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

    <div class="shell-body">
      <!-- 左菜单：宽 126，底色 #7CAEE0 60%，项 79×77 @ x=21，字 18 白 -->
      <aside class="side-menu">
        <ul>
          <li
            v-for="(item, i) in menuItems"
            :key="item"
            :class="{ active: i === activeIndex }"
          >
            {{ item }}
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
  min-height: 100vh;
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
}
</style>
