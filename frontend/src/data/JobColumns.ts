import { createColumnHelper } from '@tanstack/vue-table'
import { useJobStore } from '@/stores/JobStore'
import type { Job } from '@/interfaces/Job'
import SelectComponent from '@/components/Table/SelectComponent.vue'
import { BaseService } from '@/services/BaseService'
import { JOB_STATUS_OPTIONS } from './StatusListOptions'
import { h } from 'vue'
import TableDropdown from '@/components/Table/TableDropdown.vue'

const columnHelper = createColumnHelper<Job>()

export const JobColumns = [
  columnHelper.accessor('title', {
    header: () => 'Title',
    cell: (info) => {
      const jobStore = useJobStore()
      return h(
        'a',
        {
          class: 'hover:underline',
          href: info.row.original.link,
          target: '_blank',
          onClick: () => {
            jobStore.openJobDialog(info.row.original)
          },
        },
        info.getValue(),
      )
    },
  }),
  columnHelper.accessor('company', {
    header: 'Company',
    cell: (info) => h('div', info.getValue()),
  }),
  columnHelper.accessor('website', {
    header: 'Website',
    cell: (info) =>
      h(
        'div',
        {
          class:
            'inline-flex items-center justify-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200',
        },
        info.getValue(),
      ),
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created At',
    cell: (info) => {
      const formattedDate: string = new Date(info.getValue())
        .toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
        .replace(/\//g, '-')

      return h('div', formattedDate)
    },
  }),
  // TODO: add Posted date later
  columnHelper.accessor('status', {
    header: () => {
      return 'Status'
    },
    cell: (info) => {
      return h(SelectComponent, {
        selectedOption: info.row.original.status,
        'onUpdate:selectedOption': (newValue) => {
          info.row.original.status = String(newValue)
          try {
            const response = BaseService('job').updateObject<Job>(
              info.row.original.id,
              info.row.original,
            )
            return response
          } catch (error) {
            console.error(error)
          }
        },
        optionList: JOB_STATUS_OPTIONS,
        label: 'Status',
      })
    },
  }),
]
