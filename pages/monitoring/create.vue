<template>
  <div>
    <FormKit
      v-slot="{ state: { valid } }"
      v-model="formData"
      type="form"
      form-class="flex flex-col gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-md"
      :actions="false"
      @submit="handleFormSubmit"
    >
      <FormKit
        name="host"
        label="Host"
        placeholder="www.google.com"
        validation="required"
        help="Specify a valid host for the server you want to monitor."
      />

      <div class="self-end">
        <button class="btn" type="submit" :disabled="!valid">
          <IconOK />
          <span>Add</span>
        </button>
      </div>
    </formkit>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useFetch, useRouter } from '#imports'
import IconOK from '~icons/material-symbols/done'

const router = useRouter()
const formData = ref<any>({})

async function handleFormSubmit () {
  await useFetch('/api/monitoring', {
    method: 'POST',
    body: {
      host: formData.value.host
    }
  })

  await router.push('/')
}
</script>
