<template>
  <NuxtLink :to="`/monitoring/${monitoring.id}`" class="flex gap-6 items-center">
    <span class="grow py-5 pl-5 font-medium">{{ monitoring.host }}</span>

    <div class="w-1/2 h-14">
      <canvas ref="chartTotalDuration" />
    </div>

    <div class="flex items-center pr-5">
      <span
        class="p-1 text-white rounded-full"
        :class="[isRequestOk ? 'bg-lime-600' : 'bg-orange-600 animate-pulse']"
      >
        <IconOK v-if="isRequestOk" class="w-6 h-auto" />
        <IconError v-else class="w-6 h-auto" />
      </span>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import {
  Chart as ChartJS,
  Tooltip,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
} from 'chart.js'
import { computed, onMounted, toRefs, ref, watch } from 'vue'
import { useNuxtApp } from '#app'
import IconOK from '~icons/material-symbols/done'
import IconError from '~icons/material-symbols/close'

const properties = defineProps({
  monitoring: {
    type: Object,
    required: true
  }
})

const { monitoring } = toRefs(properties)

const { $colorMode } = useNuxtApp()

const chartTotalDuration = ref()

const lastRequest = computed(() => monitoring.value.requests[0])
const isRequestOk = computed(() => lastRequest.value?.statusCode >= 200 && lastRequest.value?.statusCode < 300)
const chartTotalDurationData = computed(() => {
  const items = [...monitoring.value.requests].reverse().slice(0, 75)

  return {
    labels: items.map(request => request.id),
    datasets: [{
      data: items.map(request => request.totalDuration),
      borderWidth: 1,
      pointBorderWidth: 0,
      tension: 0.2,
      borderColor: $colorMode.value === 'light' ? 'rgb(148 163 184)' : 'rgb(148 163 184)'
    }]
  }
})

let chartJSInstance

onMounted(() => {
  ChartJS.register(
    Tooltip,
    LineController,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  )

  chartJSInstance = new ChartJS(chartTotalDuration.value, {
    type: 'line',
    data: chartTotalDurationData.value,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          display: false
        },
        x: {
          display: false
        }
      },
      elements: {
        point: {
          borderWidth: 0,
          backgroundColor: 'rgba(0,0,0,0)'
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          yAlign: 'center',
          displayColors: false,
          callbacks: {
            title: () => '',
            label: (context: any) => {
              return `Total duration ${Math.round(context.raw)} ms`
            }
          }
        }
      }
    }
  })
})

watch(chartTotalDurationData, (value) => {
  if (value.labels.length === chartJSInstance.data.labels.length) {
    return
  }

  chartJSInstance.data = chartTotalDurationData.value
  chartJSInstance.update()
})
</script>
