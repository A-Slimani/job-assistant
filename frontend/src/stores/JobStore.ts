import type { Job } from '@/interfaces/Job'
import { BaseService } from '@/services/BaseService'
import { defineStore } from 'pinia'

export const useJobStore = defineStore('job', {
  state: () => ({
    jobs: [] as Job[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchJobs() {
      const JobService = BaseService('job')

      this.loading = true
      this.error = null

      try {
        this.jobs = await JobService.getAll<Job[]>()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch jobs'
      } finally {
        this.loading = false
      }
    },
  },

  getters: {
    // savedRoles(): Job[] {
    //   return this.jobs.filter((job) => job.status !== 'None')
    // },
  },
})
