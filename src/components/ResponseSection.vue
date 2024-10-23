<template>
  <div class="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
    <h3 class="font-semibold mb-2 text-gray-900">WellGuide Response:</h3>
    <div class="prose prose-sm sm:prose max-w-none">
      <div 
        class="text-gray-700 text-sm sm:text-base leading-relaxed"
        v-html="formattedResponse"
      ></div>
    </div>
    
    <div v-if="!feedbackGiven" class="mt-4 border-t pt-4">
      <p class="text-sm text-gray-600 mb-2">Was this response helpful?</p>
      <div class="flex space-x-4">
        <button
          @click="$emit('submitFeedback', true)"
          class="flex items-center space-x-1 text-sm px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
          :class="{ 'text-green-600': feedback === true }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
          <span>Helpful</span>
        </button>
        <button
          @click="$emit('submitFeedback', false)"
          class="flex items-center space-x-1 text-sm px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
          :class="{ 'text-red-600': feedback === false }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
          </svg>
          <span>Not helpful</span>
        </button>
      </div>
    </div>
    <div v-else class="mt-4 text-sm text-gray-600">
      Thank you for your feedback!
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const props = defineProps<{
  response: string;
  feedbackGiven: boolean;
  feedback: boolean | null;
}>()

defineEmits<{
  (e: 'submitFeedback', value: boolean): void;
}>()

const formattedResponse = computed(() => {
  // Convert markdown to HTML and sanitize
  const html = marked(props.response, {
    breaks: true,
    gfm: true
  })
  return DOMPurify.sanitize(html)
})
</script>

<style>
.prose h1 {
  @apply text-2xl font-bold mb-4 mt-6;
}
.prose h2 {
  @apply text-xl font-bold mb-3 mt-5;
}
.prose h3 {
  @apply text-lg font-bold mb-2 mt-4;
}
.prose p {
  @apply mb-4;
}
.prose ul {
  @apply list-disc pl-6 mb-4;
}
.prose ol {
  @apply list-decimal pl-6 mb-4;
}
.prose li {
  @apply mb-1;
}
.prose strong {
  @apply font-bold;
}
.prose em {
  @apply italic;
}
.prose blockquote {
  @apply border-l-4 border-gray-300 pl-4 italic my-4;
}
.prose code {
  @apply bg-gray-100 rounded px-1 py-0.5;
}
</style>