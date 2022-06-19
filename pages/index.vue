<template>
  <section class="p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
    <div class="flex flex-col divide-y-2 dark:divide-slate-700">
      <div
        v-for="(monitoring, index) in monitoringList"
        :key="index"
        class="flex items-center p-3"
      >
        <span class="grow font-medium">{{ monitoring.url }}</span>
        <div class="flex items-center">
          <span
            class="p-1 text-white rounded-full"
            :class="{'bg-lime-600': monitoring.status === 'OK', 'bg-orange-600': monitoring.status === 'ERROR'}"
          >
            <IconOK v-if="monitoring.status === 'OK'" class="w-6 h-auto" />
            <IconError v-else class="w-6 h-auto" />
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useFetch } from '#imports'
import IconOK from '~icons/material-symbols/done'
import IconError from '~icons/material-symbols/close'

const { refresh: refreshStates } = await useFetch('/api/state-resolver')
const { data: monitoringList, refresh: refreshList } = await useFetch('/api/monitoring')

setInterval(async () => {
  await refreshStates()
  await refreshList()
}, 10_000)
</script>
