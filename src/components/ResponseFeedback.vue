<template>
  <div v-if="!feedbackGiven" class="mt-4 border-t pt-4">
    <p class="text-sm text-gray-600 mb-2">Was this response helpful?</p>
    <div class="flex space-x-4">
      <button
        @click="submitFeedback(true)"
        class="flex items-center space-x-1 text-sm px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
        :class="{ 'text-green-600': feedback === true }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
        </svg>
        <span>Helpful</span>
      </button>
      <button
        @click="submitFeedback(false)"
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
</template>

<script setup lang="ts">
const props = defineProps<{
  feedback: boolean | null
  feedbackGiven: boolean
  response: string
  focusArea: string
}>()

const emit = defineEmits<{
  (e: 'update:feedback', value: boolean): void
  (e: 'update:feedbackGiven', value: boolean): void
}>()

const submitFeedback = async (isHelpful: boolean) => {
  emit('update:feedback', isHelpful)
  emit('update:feedbackGiven', true)
  
  try {
    await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        focusArea: props.focusArea,
        helpful: isHelpful,
        response: props.response
      })
    })
  } catch (err) {
    console.error('Failed to submit feedback:', err)
  }
}
</script>