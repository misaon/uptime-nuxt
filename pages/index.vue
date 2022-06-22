<template>
  <section class="bg-slate-100 dark:bg-slate-800 rounded-md">
    <div class="flex flex-col divide-y-2 dark:divide-slate-700">
      <MonitoringRow v-for="monitoring in monitoringList" :key="monitoring.id" :monitoring="monitoring" />
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

const { data: monitoringList, refresh: refreshList } = await useFetch('/api/monitoring')

setInterval(async () => {
  await refreshList()
}, 5000)
</script>
