<script setup lang="ts" generic="TData extends number | string">
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from '@/components/ui/select'

const optionList = defineModel<TData[]>('optionList', { required: true })
const selectedOption = defineModel<TData>('selectedOption', { required: true })
</script>

<template>
  <Select v-model="selectedOption">
    <SelectTrigger class="w-[180px]">
      <SelectValue placeholder="Select Page Size" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Page Size</SelectLabel>
        <SelectItem v-for="option in optionList" :value="option" :key="option">
          {{ option }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
