<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from '@tanstack/vue-table'
import { ref, watch } from 'vue'
import SelectComponent from '@/components/Table/SelectComponent.vue'
import RefreshButton from '@/components/Table/RefreshButton.vue'
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

// VUE TABLE
const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isAllJobs?: boolean
}>()

const pageSizes = [20, 30, 50, 100]
const selectedPageSize = ref<number>(pageSizes[0])
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
      pageSize: pageSizes[0],
    },
  },
})

// WATCHERS
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
      class="flex justify-between"
      v-slot="{ page }"
      v-model:page="currentPage"
      :items-per-page="selectedPageSize"
      :total="data.length"
      :default-page="1"
    >
      <SelectComponent
        v-if="props.isAllJobs"
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
      <RefreshButton />
    </Pagination>
  </div>
</template>
