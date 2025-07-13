<script setup lang="ts">
import { ref } from 'vue'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from '@/components/ui/select'

const props = defineProps<{
  pageSizes: number[]
}>()

const selectedPageSize = ref<number>(props.pageSizes[0])
</script>

<template>
  <Select>
    <SelectTrigger class="w-[180px]" v-model="selectedPageSize">
      <SelectValue placeholder="Select Page Size" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Page Size</SelectLabel>
        <SelectItem v-for="size in pageSizes" value="size" :key="size">{{ size }}</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
