<template>
  <div class="mt-8">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">Quick Health Guides</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="card in selectedCards" :key="card.title" class="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <div class="flex items-center mb-3">
          <span :class="`${card.iconClass} rounded-full p-2 bg-opacity-10`">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="card.icon === 'mind'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              <path v-else-if="card.icon === 'heart'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              <path v-else-if="card.icon === 'support'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path v-else-if="card.icon === 'sleep'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              <path v-else-if="card.icon === 'nutrition'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              <path v-else-if="card.icon === 'exercise'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
          </span>
          <h3 class="ml-2 font-semibold text-gray-900">{{ card.title }}</h3>
        </div>
        <ul class="space-y-2 text-sm text-gray-600">
          <li v-for="(tip, index) in card.tips" :key="index" class="flex items-center">
            <span :class="`w-2 h-2 ${card.bulletClass} rounded-full mr-2`"></span>
            {{ tip }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const allCards = [
  {
    title: 'Mental Health Tips',
    icon: 'mind',
    iconClass: 'text-purple-500',
    bulletClass: 'bg-purple-500',
    tips: [
      'Practice daily mindfulness meditation',
      'Maintain a regular sleep schedule',
      'Connect with friends or family daily',
      'Take regular breaks from screens'
    ]
  },
  {
    title: 'Wellness Essentials',
    icon: 'heart',
    iconClass: 'text-green-500',
    bulletClass: 'bg-green-500',
    tips: [
      'Drink 8 glasses of water daily',
      '30 minutes of exercise',
      'Eat 5 servings of vegetables',
      'Take vitamin supplements'
    ]
  },
  {
    title: 'Depression Support',
    icon: 'support',
    iconClass: 'text-blue-500',
    bulletClass: 'bg-blue-500',
    tips: [
      'Set small, achievable daily goals',
      'Practice self-compassion',
      'Maintain daily routine',
      'Seek professional support'
    ]
  },
  {
    title: 'Stress Management',
    icon: 'mind',
    iconClass: 'text-indigo-500',
    bulletClass: 'bg-indigo-500',
    tips: [
      'Practice deep breathing exercises',
      'Take regular exercise breaks',
      'Set boundaries at work',
      'Create a calming bedtime routine'
    ]
  },
  {
    title: 'Physical Wellness',
    icon: 'exercise',
    iconClass: 'text-red-500',
    bulletClass: 'bg-red-500',
    tips: [
      'Stretch for 10 minutes daily',
      'Take the stairs instead of elevator',
      'Get regular health check-ups',
      'Practice good posture'
    ]
  },
  {
    title: 'Anxiety Relief',
    icon: 'support',
    iconClass: 'text-teal-500',
    bulletClass: 'bg-teal-500',
    tips: [
      'Use grounding techniques',
      'Write in a worry journal',
      'Practice progressive relaxation',
      'Limit caffeine intake'
    ]
  },
  {
    title: 'Sleep Hygiene',
    icon: 'sleep',
    iconClass: 'text-violet-500',
    bulletClass: 'bg-violet-500',
    tips: [
      'Stick to a sleep schedule',
      'Create a relaxing bedroom environment',
      'Avoid screens before bedtime',
      'Practice relaxation techniques'
    ]
  },
  {
    title: 'Nutrition Guide',
    icon: 'nutrition',
    iconClass: 'text-emerald-500',
    bulletClass: 'bg-emerald-500',
    tips: [
      'Eat a rainbow of vegetables',
      'Choose whole grains',
      'Include protein in every meal',
      'Stay hydrated throughout the day'
    ]
  },
  {
    title: 'Mindful Living',
    icon: 'mind',
    iconClass: 'text-cyan-500',
    bulletClass: 'bg-cyan-500',
    tips: [
      'Practice present moment awareness',
      'Take mindful walks in nature',
      'Eat meals without distractions',
      'Regular digital detox'
    ]
  }
]

const selectedCards = ref<typeof allCards>([])

onMounted(() => {
  const shuffled = [...allCards].sort(() => Math.random() - 0.5)
  selectedCards.value = shuffled.slice(0, 3)
})
</script>