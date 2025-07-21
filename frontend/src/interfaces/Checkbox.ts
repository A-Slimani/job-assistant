import type { DropdownMenuCheckboxItemProps } from 'reka-ui'

type Checked = DropdownMenuCheckboxItemProps['modelValue']

export interface Checkbox {
  key: string
  value: Checked
}
