<template>
  <form
    class="flex flex-col gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-md"
    @submit.prevent="handleFormSubmit"
  >
    <div class="flex flex-col gap-1">
      <label for="host">Host:</label>
      <input
        id="host"
        v-model="host"
        class="input"
        type="text"
        placeholder="www.google.cz"
        required
      >
    </div>

    <div class="self-end">
      <button class="btn" type="submit">
        <IconOK />
        <span>Add</span>
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useFetch, useRouter } from '#imports'
import IconOK from '~icons/material-symbols/done'

const router = useRouter()
const host = ref()

async function handleFormSubmit () {
  await useFetch('/api/monitoring', {
    method: 'POST',
    body: {
      host: host.value
    }
  })

  await router.push('/')
}
</script>
