<template>
  <header class="bg-white shadow-sm">
    <nav class="container mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-center justify-between">
        <router-link to="/" class="text-xl sm:text-2xl font-bold text-blue-600">
          WellGuide
        </router-link>
        <button 
          @click="isMenuOpen = !isMenuOpen"
          class="sm:hidden p-2 text-gray-600 hover:text-gray-900"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              v-if="isMenuOpen"
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12"
            />
            <path 
              v-else
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      
      <div 
        :class="{'hidden': !isMenuOpen}"
        class="mt-4 sm:mt-0 sm:flex sm:space-x-8"
      >
        <router-link 
          v-for="item in menuItems" 
          :key="item.path"
          :to="item.path"
          class="block py-2 sm:py-0 text-gray-600 hover:text-gray-900 transition-colors"
          :class="{ 'text-blue-600 font-medium': isCurrentPath(item.path) }"
        >
          {{ item.name }}
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMenuOpen = ref(false)

const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' }
]

const isCurrentPath = (path: string): boolean => {
  return route.path === path
}
</script>