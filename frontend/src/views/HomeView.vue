<script setup lang="ts">
import { onMounted } from 'vue'
import { useJobStore } from '@/stores/JobStore'
import { storeToRefs } from 'pinia'

const jobStore = useJobStore()

const { loading, error, jobs } = storeToRefs(jobStore)

onMounted(() => {
  if (!jobs.value.length) jobStore.fetchJobs()
})
</script>

<template>
  <div class="w-full">
    <h1 class="text-2xl font-bold mb-6">Tracked Jobs</h1>
    <div v-if="loading" class="text-center py-4">loading jobs...</div>
    <div v-else-if="error" class="text-red-500 text-center py-4">
      {{ error }}
    </div>
    <div v-for="job in jobs" :key="String(job)">
    </div>
  </div>
</template>
