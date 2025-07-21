<script lang="ts" setup generic="TData">
import type { Checkbox } from '@/interfaces/Checkbox'
import { Search } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'

// const props = defineProps<{
//   header: string
// }>()

const checkedValues = defineModel<Checkbox[]>()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <!--
      <Button variant="ghost">
        {{ props.header }}
      </Button>
    -->
      <button><Search /></button>
    </DropdownMenuTrigger>
    <DropdownMenuContent v-model="checkedValues">
      <DropdownMenuCheckboxItem
        v-for="(value, index) in checkedValues"
        :key="index"
        v-model:model-value="value.value"
      >
        {{ value.key }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
