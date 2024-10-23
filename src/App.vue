<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    <main class="container mx-auto py-4 sm:py-8">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
</script>