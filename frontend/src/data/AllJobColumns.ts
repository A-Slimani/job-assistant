import type { ColumnDef } from '@tanstack/vue-table'
import type { Job } from '@/interfaces/Job'
import { h } from 'vue'


export const AllJobColumns: ColumnDef<Job>[] = [
  {
    accessorKey: 'title',
    header: 'Job Title',
    cell: ({ row }) => {
      const rowValue: string =
        typeof row.getValue('title') === 'string' ? row.getValue('title') : ''
      const length: number = rowValue.length
      const updatedValue = length > 50 ? `${rowValue.substring(0, 48)} ...` : rowValue
      return h('div', { class: 'w-80' }, updatedValue)
    },
  },
  {
    accessorKey: 'company',
    header: 'Company',
    cell: ({ row }) => {
      const rowValue: string =
        typeof row.getValue('company') === 'string' ? row.getValue('company') : ''
      const length: number = rowValue.length
      const updatedValue = length > 50 ? `${rowValue.substring(0, 48)} ...` : rowValue
      return h('div', { class: 'w-60' }, updatedValue)
    },
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => h('div', row.getValue('location')),
    // to update when location gets fixed
  },
  {
    // maybe make this a tag
    accessorKey: 'website',
    header: 'Website',
    cell: ({ row }) =>
      h(
        'div',
        {
          class:
            'inline-flex items-center justify-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200',
        },
        row.getValue('website'),
      ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const formattedDate: string = new Date(row.getValue('createdAt')).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '-')

      return h('div', formattedDate)
    }
  },
  {
    header: 'Post Date',
    cell: '<<ToAdd>> ',
  },
  {
    accessorKey: 'status',
    header: 'Status (to change to a dropdown)',
    cell: ({ row }) => {

      return h('div', row.getValue('status'))
    }
  },
]
