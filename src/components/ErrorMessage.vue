<template>
  <div class="bg-red-50 border border-red-200 p-4 rounded-lg">
    <p class="text-red-600 text-sm">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  error: string;
}>()
</script>