<template>
  <div class="bg-blue-50 border border-blue-200 rounded-lg">
    <button 
      @click="toggleDisclaimer"
      class="w-full px-4 py-3 flex justify-between items-center text-left"
    >
      <div class="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
        <h3 class="text-sm font-semibold text-blue-900">Important Medical Disclaimer</h3>
      </div>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-5 w-5 text-blue-600 transform transition-transform duration-200"
        :class="{ 'rotate-180': modelValue }"
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
    <div 
      v-show="modelValue"
      class="px-4 pb-4 text-xs text-blue-800 space-y-2"
    >
      <p>The information provided by this app is for informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. The AI-generated responses and suggestions are based on the symptoms you provide and should not be considered definitive medical guidance. Always seek the advice of a licensed healthcare professional with any questions you may have regarding your health or a medical condition. Never disregard professional medical advice or delay in seeking it because of information you received from this app. If your symptoms persist, worsen, or if you are experiencing a medical emergency, contact a healthcare provider or emergency services immediately.</p>
      <p>This app may suggest over-the-counter medications or remedies. These suggestions are general recommendations and may not be suitable for everyone. Please read the product labels and consult with a healthcare professional before using any medication or treatment. The creators of this app do not accept responsibility for any adverse outcomes resulting from the use of the information provided.</p>
      <p>By using this app, you acknowledge that you have read, understood, and agree to this disclaimer.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const toggleDisclaimer = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>