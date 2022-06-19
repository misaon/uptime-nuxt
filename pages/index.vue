<template>
  <section class="p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
    <div class="flex flex-col divide-y-2 dark:divide-slate-700">
      <div
        v-for="(monitoring, index) in monitoringList"
        :key="index"
        class="flex items-center p-3"
      >
        <span class="grow font-medium">{{ monitoring.host }}</span>
        <div class="flex items-center">
          <span
            class="p-1 text-white rounded-full"
            :class="{'bg-lime-600': monitoring.status === 'OK', 'bg-orange-600 animate-pulse': monitoring.status === 'ERROR'}"
          >
            <IconOK v-if="monitoring.status === 'OK'" class="w-6 h-auto" />
            <IconError v-else class="w-6 h-auto" />
          </span>
        </div>
      </div>
      <p v-if="monitoringList.length === 0" class="self-center">
        The list is empty, please
        <NuxtLink to="/monitoring/create">
          add monitoring
        </NuxtLink>
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useFetch } from '#imports'
import IconOK from '~icons/material-symbols/done'
import IconError from '~icons/material-symbols/close'

const { data: monitoringList, refresh: refreshList } = await useFetch('/api/monitoring')

setInterval(async () => {
  await refreshList()
}, 3000)
</script>
