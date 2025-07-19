<script setup lang="ts">
import DataTable from '@/components/Table/DataTable.vue'
import { useJobStore } from '@/stores/JobStore'
import { JobColumns } from '@/data/JobColumns.ts'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import JobDialog from '@/components/JobDialog.vue'

const jobStore = useJobStore()

const { loading, error, jobs } = storeToRefs(jobStore)

onMounted(() => {
  if (!jobs.value.length) jobStore.fetchJobs()
})
</script>

<template>
  <div class="w-full">
    <h1 class="text-2xl font-bold mb-6">All Roles</h1>
    <div v-if="loading" class="text-center py-4">Loading jobs...</div>
    <div v-else-if="error" class="text-red-500 text-center py-4">
      {{ error }}
    </div>
    <DataTable v-else :columns="JobColumns" :data="jobs" :is-all-jobs="true" />
    <JobDialog />
  </div>
</template>
