import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Blog from './views/Blog.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog
    }
  ]
})