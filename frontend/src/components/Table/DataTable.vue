<script setup lang="ts" generic="TData, TColumns">
import type { SortingState, ColumnFiltersState } from '@tanstack/vue-table'
import { ref, watch } from 'vue'
import SelectComponent from '@/components/Table/SelectComponent.vue'
import RefreshButton from '@/components/Table/RefreshButton.vue'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import type { Job } from '@/interfaces/Job'
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useVueTable,
  getSortedRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
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
import type { JobColumns } from '@/data/JobColumns'
import TableDropdown from './TableDropdown.vue'

// VUE TABLE
const props = defineProps<{
  columns: typeof JobColumns
  data: Job[]
  isAllJobs?: boolean
}>()

const pageSizes = [20, 30, 50, 100]
const selectedPageSize = ref<number>(pageSizes[0])
const currentPage = ref<number>(1)
const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const globalFilter = ref('')

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
    get globalFilter() {
      return globalFilter.value
    },
  },
  initialState: {
    pagination: {
      pageSize: pageSizes[0],
    },
  },
  onColumnFiltersChange: (updaterOrValue) => {
    columnFilters.value =
      typeof updaterOrValue == 'function' ? updaterOrValue(columnFilters.value) : updaterOrValue
  },
  onGlobalFilterChange: (updaterOrValue) => {
    globalFilter.value =
      typeof updaterOrValue === 'function' ? updaterOrValue(globalFilter.value) : updaterOrValue
  },
  onSortingChange: (updaterOrValue) => {
    sorting.value =
      typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue
  },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  getFacetedMinMaxValues: getFacetedMinMaxValues(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
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
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              @click="header.column.getToggleSortingHandler()?.($event)"
            >
              <div class="flex gap-2">
                <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
                <!-- Create another icon for sorting and remove the click above -->
                <ChevronUp v-if="header.column.getIsSorted() === 'asc'" :size="18" />
                <ChevronDown v-if="header.column.getIsSorted() === 'desc'" :size="18" />
              </div>
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
