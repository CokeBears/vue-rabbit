import { createRouter, createWebHistory } from 'vue-router'
//createRouter:创建router路由实例
//createWebHistory：创建history模式路由

import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: 'category/:id',
          name: 'category',
          component: Category
        },
        {
          path: 'category/sub/:id',
          name: 'SubCategory',
          component: SubCategory
        }
      ]
    },
    {
      path: '/Login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
