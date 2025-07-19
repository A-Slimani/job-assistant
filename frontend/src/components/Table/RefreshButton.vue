<script setup lang="ts">
import { RefreshCcw } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { useJobStore } from '@/stores/JobStore'
import { toast } from 'vue-sonner'

const jobStore = useJobStore()

const updateJobs = () => {
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
  <Button variant="outline" @click="updateJobs"> update <RefreshCcw /></Button>
</template>
