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

      <div class="flex justify-between">
        <button class="btn" type="button" @click="handleRemoveMonitoring">
          <IconDelete />
          <span>Delete</span>
        </button>

        <button class="btn" type="submit" :disabled="!valid">
          <IconOK />
          <span>Save</span>
        </button>
      </div>
    </formkit>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useFetch, useRouter, useRoute } from '#imports'
import IconOK from '~icons/material-symbols/done'
import IconDelete from '~icons/material-symbols/delete'

const route = useRoute()
const router = useRouter()

const { data: monitoring } = await useFetch(`/api/monitoring/${route.params.id}`, {
  method: 'GET'
})

const formData = ref<any>({
  host: monitoring.value.host
})

async function handleFormSubmit () {
  await useFetch(`/api/monitoring/${route.params.id}`, {
    method: 'PUT',
    body: {
      host: formData.value.host
    }
  })

  await router.push('/')
}

async function handleRemoveMonitoring () {
  await useFetch(`/api/monitoring/${route.params.id}`, {
    method: 'DELETE'
  })

  await router.push('/')
}
</script>
