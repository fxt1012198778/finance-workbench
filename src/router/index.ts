import { createRouter, createWebHistory } from 'vue-router'
import AppShell from '@/layouts/AppShell.vue'
import Home from '@/views/Home.vue'

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
        },
      ],
    },
  ],
})

export default router
