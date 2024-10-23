<template>
  <div class="max-w-4xl mx-auto px-4">
    <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Health & Wellness Blog</h1>
    
    <div class="grid gap-8">
      <article v-for="post in blogPosts" :key="post.id" class="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">{{ post.title }}</h2>
        <p class="text-sm text-gray-500 mb-4">{{ post.date }}</p>
        <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">{{ post.excerpt }}</p>
        <button class="text-blue-500 hover:text-blue-600 text-sm sm:text-base font-medium">
          Read more
        </button>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const blogPosts = [
  {
    id: 1,
    title: 'Understanding Mental Health in the Digital Age',
    date: 'October 15, 2023',
    excerpt: 'In today\'s fast-paced digital world, maintaining good mental health has become more important than ever. Learn about the challenges and strategies for staying mentally healthy.'
  },
  {
    id: 2,
    title: 'The Importance of Regular Exercise',
    date: 'October 10, 2023',
    excerpt: 'Regular physical activity is crucial for both physical and mental well-being. Discover simple ways to incorporate exercise into your daily routine.'
  },
  {
    id: 3,
    title: 'Nutrition Tips for Better Health',
    date: 'October 5, 2023',
    excerpt: 'Good nutrition is the foundation of health and wellness. Learn about balanced diets and healthy eating habits that can improve your overall well-being.'
  }
]
</script>