<template>
  <div class="flex gap-3">
    <aside class="w-72 p-3 bg-neutral-100 dark:bg-neutral-800 rounded">
      <div class="flex flex-col gap-3">
        <div class="flex gap-1 items-center">
          <IconList class="w-6 h-auto" />
          <span class="font-bold">Monitoring list</span>
        </div>
        <nav class="flex flex-col gap-3">
          <NuxtLink v-for="(monitoring, index) in monitoringList" :key="index" class="btn pl-1" to="">
            <IconArrowRight class="w-6 h-auto" />
            <span>{{ monitoring.url }}</span>
          </NuxtLink>
        </nav>
      </div>
    </aside>

    <section class="flex-grow p-3 gap-3 bg-neutral-100 dark:bg-neutral-800 rounded">
      <table class="w-full text-left table-auto rounded overflow-hidden">
        <thead class="uppercase bg-neutral-200 dark:bg-neutral-700">
          <tr>
            <th class="p-3">
              URL
            </th>
            <th class="p-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(monitoring, index) in monitoringList"
            :key="index"
            class="dark:border-neutral-600"
            :class="{'border-b': index !== Object.keys(monitoringList).length - 1}"
          >
            <td class="p-3 font-bold">
              {{ monitoring.url }}
            </td>
            <td class="p-3 whitespace-nowrap w-px text-center">
              <span
                class="inline-flex rounded-full text-white font-bold px-2 py-1"
                :class="{'bg-green-800': monitoring.status === 'OK', 'bg-red-800': monitoring.status === 'ERROR'}"
              >
                <template v-if="monitoring.status === 'OK'">
                  <IconOK class="w-6 h-auto" />
                </template>
                <template v-else>
                  <IconError class="w-6 h-auto" />
                </template>
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <p class="text-right font-light text-sm">
        Automatically refreshed every 10 seconds
      </p>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { useFetch } from '#imports'
import IconList from '~icons/material-symbols/list-alt-outline'
import IconArrowRight from '~icons/material-symbols/chevron-right-rounded'
import IconOK from '~icons/material-symbols/done'
import IconError from '~icons/material-symbols/dangerous-outline-rounded'

const { refresh: refreshStates } = await useFetch('/api/state-resolver')
const { data: monitoringList, refresh: refreshList } = await useFetch('/api/monitoring')

setInterval(async () => {
  await refreshStates()
  await refreshList()
}, 10_000)
</script>
