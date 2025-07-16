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

const props = defineProps<{
  placeholder: string
  label: string
}>()

const optionList = defineModel<TData[]>('optionList', { required: true })
const selectedOption = defineModel<TData>('selectedOption')
</script>

<template>
  <Select v-model="selectedOption">
    <SelectTrigger class="w-[180px]">
      <SelectValue :placeholder="props.placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{{ props.label }}</SelectLabel>
        <SelectItem v-for="option in optionList" :value="option" :key="option">
          {{ option }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
