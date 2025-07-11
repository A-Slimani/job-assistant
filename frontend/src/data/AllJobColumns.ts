import type { ColumnDef } from '@tanstack/vue-table'
import type { Job } from '@/interfaces/Job'
import { h } from 'vue'

export const AllJobColumns: ColumnDef<Job>[] = [
  {
    accessorKey: 'title',
    header: 'Job Title',
    cell: ({ row }) => {
      // const rowValue = row.getValue('title')
      // const length = typeof rowValue === 'string' ?  rowValue.length : 0
      // const updatedValue = length > 50 ?
      return h('div', { class: 'w-80' }, row.getValue('title'))
    }
  },
  {
    accessorKey: 'company',
    header: 'Company',
    cell: ({ row }) => h('div', { class: 'w-60' }, row.getValue('company')),
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => h('div', row.getValue('location')),
  },
  {
    accessorKey: 'website',
    header: 'Website',
    cell: ({ row }) => h('div',  row.getValue('website')),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell:  ({ row }) => h('div', row.getValue('createdAt')),
  },
  {
    header: 'Post Date',
    cell: '<< To Add >> '
  },
  {
    accessorKey: 'status',
    header: 'Status (to change to a dropdown)',
    cell: ({ row }) => h('div', row.getValue('status')),
  },
]
