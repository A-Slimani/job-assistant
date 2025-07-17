<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { useJobStore } from '@/stores/JobStore'
import { storeToRefs } from 'pinia'
import SelectComponent from '@/components/Table/SelectComponent.vue'
import { JOB_STATUS_OPTIONS } from '@/data/StatusListOptions'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const jobStore = useJobStore()

const { isDialogOpen, selectedJob } = storeToRefs(jobStore)
</script>

<template>
  <Dialog v-model:open="isDialogOpen">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Update Role</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div v-if="selectedJob" class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right">Status</Label>
          <SelectComponent
            v-model:selected-option="selectedJob.status"
            :option-list="JOB_STATUS_OPTIONS"
            label="status"
          />
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
