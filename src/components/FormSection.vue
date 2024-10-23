<template>
  <div class="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
    <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4">How can we help you today?</h2>
    
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Focus area</label>
        <select
          v-model="formData.focusArea"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm sm:text-base"
        >
          <option value="">Select one</option>
          <option v-for="area in focusAreas" :key="area" :value="area">
            {{ area }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          v-model="formData.symptoms"
          rows="4"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-sm sm:text-base"
          :placeholder="getPlaceholder"
        ></textarea>
      </div>

      <div class="flex justify-end">
        <button
          @click="$emit('submit')"
          :disabled="!isFormValid || isLoading"
          class="inline-flex items-center px-8 py-3 text-base sm:text-lg bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm hover:shadow-md"
        >
          <span v-if="isLoading">Processing...</span>
          <span v-else>Ask WellGuide</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  formData: {
    focusArea: string;
    symptoms: string;
  };
  isLoading: boolean;
  isFormValid: boolean;
}>()

defineEmits<{
  (e: 'submit'): void;
}>()

const focusAreas = ['General wellness', 'Depression', 'Mental health']

const placeholders = {
  'General wellness': 'Describe your physical health symptoms or concerns in detail...',
  'Depression': 'Share how you\'ve been feeling emotionally and what changes you\'ve noticed...',
  'Mental health': 'Describe your mental health concerns, thoughts, or emotional challenges...'
}

const getPlaceholder = computed(() => {
  return props.formData.focusArea ? placeholders[props.formData.focusArea as keyof typeof placeholders] : 'Please select a focus area first...'
})
</script>