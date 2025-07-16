<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from '@tanstack/vue-table'
import { ref, watch } from 'vue'
import SelectComponent from '@/components/Table/SelectComponent.vue'
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageSizes: number[]
}>()

const selectedPageSize = ref<number>(props.pageSizes[0])
const currentPage = ref<number>(1)

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  initialState: {
    pagination: {
      pageSize: props.pageSizes[0],
    },
  },
})

watch(selectedPageSize, (newValue) => {
  table.setPageSize(newValue)
})
watch(currentPage, (newValue) => {
  table.setPageIndex(newValue)
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender :render="header.column.columnDef.header" :props="header.getContext" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
    <Pagination
      v-slot="{ page }"
      v-model:page="currentPage"
      :items-per-page="selectedPageSize"
      :total="data.length"
      :default-page="1"
    >
      <SelectComponent
        v-model:selected-option="selectedPageSize"
        :option-list="pageSizes"
        placeholder="page size"
        label="page size"
      />
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious />
        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === page"
          >
          </PaginationItem>
        </template>
        <PaginationEllipsis :index="4" />
        <PaginationNext />
      </PaginationContent>
    </Pagination>
  </div>
</template>
