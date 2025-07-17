<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useJobStore } from '@/stores/JobStore'
import { toast } from 'vue-sonner'

const jobStore = useJobStore()

const updateJobs = () => {
  // Run Fake API wait here
  toast.promise(jobStore.updateJobs(), {
    loading: 'scraping new roles...',
    success: () => {
      return `scraping new roles success`
    },
    error: (error: unknown) => `Failed: ${error}`,
  })
}
</script>

<template>
  <Button variant="outline" @click="updateJobs"> 🔄 update </Button>
</template>
