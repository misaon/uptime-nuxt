<template>
  <form
    class="flex flex-col gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-md"
    @submit.prevent="handleFormSubmit"
  >
    <div class="flex flex-col gap-1">
      <label for="url">Site URL:</label>
      <input id="url" v-model="url" class="input" type="url" required>
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
import { useFetch } from '#imports'
import IconOK from '~icons/material-symbols/done'

const url = ref()

async function handleFormSubmit () {
  await useFetch('/api/monitoring', {
    method: 'POST',
    body: {
      url: url.value
    }
  })
}
</script>
