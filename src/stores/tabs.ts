import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface TabItem {
  name: string
  title: string
  path: string
}

/** 首页常驻页签，不可关闭 */
const AFFIX_TAB: TabItem = { name: 'home', title: '首页', path: '/' }

export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<TabItem[]>([{ ...AFFIX_TAB }])

  /** 已存在则忽略（点菜单重复进同一页只留一个页签） */
  function addTab(tab: TabItem) {
    if (!tabs.value.some((t) => t.name === tab.name)) {
      tabs.value.push(tab)
    }
  }

  /**
   * 关页签，返回关完后应去的相邻页签（左优先，都没有返回 null）。
   * 首页 / 不存在的 name 返回 null 且不删。
   * W1 D7 会在这里补 localStorage 持久化。
   */
  function removeTab(name: string): TabItem | null {
    if (name === AFFIX_TAB.name) return null
    const idx = tabs.value.findIndex((t) => t.name === name)
    if (idx === -1) return null
    tabs.value.splice(idx, 1)
    return tabs.value[idx - 1] ?? tabs.value[idx] ?? null
  }

  return { tabs, addTab, removeTab }
})
