import { createRouter, createWebHistory } from 'vue-router'
import AppShell from '@/layouts/AppShell.vue'
import Home from '@/views/Home.vue'
import { useTabsStore } from '@/stores/tabs'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 布局路由：/ 挂后台壳，页面作为 children 渲染进 AppShell 的内容区
      // W10 的登录页将挂在此层级之外（不带顶栏菜单）
      path: '/',
      component: AppShell,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          meta: { title: '首页' },
        },
        // W1 D5 · 5 个路由占位页（页面内容 W3 起逐周做）
        {
          path: 'todo',
          name: 'todo',
          component: () => import('@/views/workbench/TodoView.vue'),
          meta: { title: '待我办' },
        },
        {
          path: 'handle',
          name: 'handle',
          component: () => import('@/views/workbench/HandleView.vue'),
          meta: { title: '我要办' },
        },
        {
          path: 'query',
          name: 'query',
          component: () => import('@/views/workbench/QueryView.vue'),
          meta: { title: '我要查' },
        },
        {
          path: 'study',
          name: 'study',
          component: () => import('@/views/workbench/StudyView.vue'),
          meta: { title: '我要学' },
        },
        {
          path: 'remind',
          name: 'remind',
          component: () => import('@/views/workbench/RemindView.vue'),
          meta: { title: '提醒我' },
        },
      ],
    },
  ],
})

// 进页面自动加页签（=「点菜单开页签」）；没有 meta.title 的路由不进页签
router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  if (title && to.name) {
    useTabsStore().addTab({ name: String(to.name), title, path: to.fullPath })
  }
})

export default router
