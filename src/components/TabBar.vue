<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useTabsStore } from '@/stores/tabs'

// W1 D5 · 页签栏：h=32 字号16，激活底色 #0863E6（docs/设计稿/README.md 标注值）
// 首页常驻不可关；关当前页签时跳到相邻页签
const route = useRoute()
const router = useRouter()
const store = useTabsStore()

function close(tab: { name: string; path: string }) {
  const isCurrent = route.name === tab.name
  const neighbor = store.removeTab(tab.name)
  if (isCurrent && neighbor) {
    router.push(neighbor.path)
  }
}
</script>

<template>
  <div class="tab-bar">
    <div
      v-for="tab in store.tabs"
      :key="tab.name"
      class="tab-item"
      :class="{ active: route.name === tab.name }"
      @click="router.push(tab.path)"
    >
      <span class="tab-title">{{ tab.title }}</span>
      <span
        v-if="tab.name !== 'home'"
        class="tab-close"
        title="关闭"
        @click.stop="close(tab)"
      >
        ×
      </span>
    </div>
  </div>
</template>

<style scoped>
.tab-bar {
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: stretch;
  background: #fff;
  border-bottom: 1px solid #e4e9f2;
  padding: 0 50px;
  overflow-x: auto;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 16px;
  font-size: 16px;
  color: #2c3e50;
  cursor: pointer;
  white-space: nowrap;
}

.tab-item.active {
  background: #0863e6; /* 激活底色（设计稿标注） */
  color: #fff;
}

.tab-close {
  font-size: 14px;
  line-height: 1;
  opacity: 0.7;
}

.tab-close:hover {
  opacity: 1;
}
</style>
