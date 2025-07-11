<script setup lang="ts">
import DataTable from '@/components/DataTable.vue'
import { AllJobColumns } from '@/data/AllJobColumns.ts'
import { BaseService } from '@/services/BaseService'
import type { Job } from '@/interfaces/Job'
import { ref, onMounted } from 'vue'

const jobs = ref<Job[]>([])
const loading = ref<boolean>(false)
const error = ref<string|null>(null)

const fetchJobs = async () => {
  try {
    loading.value = true
    jobs.value = await BaseService('Job').getAll()
  } catch (e) {
    error.value = 'Failed to load jobs'
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchJobs())

</script>

<template>
  <div class="w-full">
    <h1 class="text-2xl font-bold mb-6">All Roles</h1>
    <div v-if="loading" class="text-center py-4">
      Loading jobs...
    </div>
    <div v-else-if="error" class="text-red-500 text-center py-4">
      {{ error }}
    </div>

    <DataTable v-else :columns="AllJobColumns" :data="jobs" />
  </div>
</template>
