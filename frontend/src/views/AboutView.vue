<script lang="ts" setup>
import TableDropdown from '@/components/Table/TableDropdown.vue'
import type { Checkbox } from '@/interfaces/Checkbox'
import { ref } from 'vue'

const values = ['ten', 'eleven', 'twenty']

const checkedValues = ref<Checkbox[]>(values.map((v) => ({ key: v, value: true })))
</script>

<template>
  <TableDropdown v-model="checkedValues" header="filters" />
  <p>{{ checkedValues }}</p>
</template>
