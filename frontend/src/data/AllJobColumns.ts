import type { ColumnDef } from '@tanstack/vue-table'
import type { Job } from '@/interfaces/Job'
import { h } from 'vue'

export const AllJobColumns: ColumnDef<Job>[] = [
  {
    accessorKey: 'title',
    header: 'Job Title',
    cell: ({ row }) => {
      const rowValue: string = typeof row.getValue('title') === 'string' ? row.getValue('title') : ''
      const length: number = rowValue.length
      const updatedValue = length > 50 ? `${rowValue.substring(0, 48)} ...` : rowValue
      return h('div', { class: 'w-80'}, updatedValue)
    }
  },
  {
    accessorKey: 'company',
    header: 'Company',
    cell: ({ row }) => h('div', { class: 'w-60' }, row.getValue('company'))
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => h('div', row.getValue('location'))
  },
  {
    accessorKey: 'website',
    header: 'Website',
    cell: ({ row }) => h('div', row.getValue('website'))
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => h('div', row.getValue('createdAt'))
  },
  {
    header: 'Post Date',
    cell: '<< To Add >> '
  },
  {
    accessorKey: 'status',
    header: 'Status (to change to a dropdown)',
    cell: ({ row }) => h('div', row.getValue('status'))
  }
]
