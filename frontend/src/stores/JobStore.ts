import type { Job } from '@/interfaces/Job'
import { BaseService } from '@/services/BaseService'
import { JobService } from '@/services/JobService'
import { defineStore } from 'pinia'

export const useJobStore = defineStore('job', {
  state: () => ({
    jobs: [] as Job[],
    error: null as string | null,
    loading: false,
    refresh: false,
    isDialogOpen: false,
    selectedJob: null as Job | null,
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
    async updateJobs() {
      this.refresh = true
      this.error = null
      try {
        await JobService().updateAll()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to update jobs'
      } finally {
        this.refresh = false
      }
    },
    openJobDialog(job: Job) {
      this.isDialogOpen = true
      this.selectedJob = job
    },
    closeJobDialog() {
      this.isDialogOpen = false
    },
  },

  getters: {
    // savedRoles(): Job[] {
    //   return this.jobs.filter((job) => job.status !== 'None')
    // },
  },
})
