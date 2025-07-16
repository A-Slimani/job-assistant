<script setup lang="ts">
import DataTable from '@/components/Table/DataTable.vue'
import { AllJobColumns } from '@/data/AllJobColumns'
import { useJobStore } from '@/stores/JobStore'
import { onMounted } from 'vue'
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

    <DataTable
      v-else
      :columns="AllJobColumns"
      :data="jobs.filter((job) => job.status !== 'None')"
    />
  </div>
</template>
