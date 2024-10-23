<template>
  <div class="w-full max-w-4xl mx-auto mt-6 sm:mt-12 px-4">
    <h1 class="text-2xl sm:text-3xl font-bold text-center mb-6">Select a focus and enter your symptoms for WellGuide to give you suggestions that could help</h1>
    
    <div class="space-y-4 sm:space-y-6">
      <MedicalDisclaimer v-model="isDisclaimerOpen" />
      
      <FormSection 
        :form-data="formData"
        :is-loading="isLoading"
        :is-form-valid="isFormValid"
        @submit="submitForm"
      />

      <LoadingSpinner v-if="isLoading" />

      <ErrorMessage v-if="state.error" :error="state.error" />

      <ResponseSection
        v-if="state.response"
        :response="state.response"
        :feedback="state.feedback"
        :feedback-given="state.feedbackGiven"
        @submit-feedback="submitFeedback"
      />

      <SuggestionCards />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { promptTemplates } from '../config/prompts'
import MedicalDisclaimer from './MedicalDisclaimer.vue'
import FormSection from './FormSection.vue'
import LoadingSpinner from './LoadingSpinner.vue'
import ErrorMessage from './ErrorMessage.vue'
import ResponseSection from './ResponseSection.vue'
import SuggestionCards from './SuggestionCards.vue'

interface FormData {
  focusArea: string;
  symptoms: string;
}

interface State {
  response: string;
  error: string;
  feedback: boolean | null;
  feedbackGiven: boolean;
}

const isDisclaimerOpen = ref(true)
const isLoading = ref(false)

const formData = reactive<FormData>({
  focusArea: '',
  symptoms: ''
})

const state = reactive<State>({
  response: '',
  error: '',
  feedback: null,
  feedbackGiven: false
})

const isFormValid = computed(() => {
  return formData.focusArea && formData.symptoms.trim().length > 0
})

const resetState = () => {
  state.response = ''
  state.error = ''
  state.feedback = null
  state.feedbackGiven = false
}

const submitForm = async () => {
  if (!isFormValid.value || isLoading.value) return
  
  try {
    isLoading.value = true
    resetState()
    
    const template = promptTemplates[formData.focusArea as keyof typeof promptTemplates]
    if (!template) {
      throw new Error('Invalid focus area')
    }

    const userMessage = template.userTemplate.replace('{{symptoms}}', formData.symptoms)

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: template.systemMessage },
          { role: "user", content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    })

    if (!response.ok) {
      throw new Error('Failed to get response from AI')
    }

    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content
    if (!aiResponse) {
      throw new Error('No response from AI')
    }

    state.response = `${aiResponse}\n\n${template.disclaimer}`
  } catch (err: any) {
    console.error('Error:', err)
    state.error = err.message || 'An unexpected error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const submitFeedback = (isHelpful: boolean) => {
  state.feedback = isHelpful
  state.feedbackGiven = true
  
  // Store feedback in localStorage
  try {
    const feedbackData = {
      timestamp: new Date().toISOString(),
      focusArea: formData.focusArea,
      helpful: isHelpful,
      response: state.response
    }
    
    const storedFeedback = JSON.parse(localStorage.getItem('wellguide_feedback') || '[]')
    storedFeedback.push(feedbackData)
    localStorage.setItem('wellguide_feedback', JSON.stringify(storedFeedback))
  } catch (err) {
    console.error('Failed to store feedback:', err)
  }
}
</script>