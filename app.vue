<template>
  <div class="flex flex-col h-full dark:text-white">
    <NuxtLayout>
      <header class="flex justify-between items-center dark:bg-neutral-800 bg-neutral-200 p-3">
        <NuxtLink class="flex items-center gap-1 text-2xl" to="/">
          <IconApp />
          <span>Uptime</span>
        </NuxtLink>

        <div class="flex items-center gap-3">
          <div class="flex gap-3 items-center">
            <button class="btn" type="button" @click="handleDarkModeSwitch">
              <IconDark class="w-6 h-auto" />
            </button>
          </div>
          <NuxtLink class="btn" to="/monitoring/create">
            <IconAddToList />
            <span>Add monitoring</span>
          </NuxtLink>
        </div>
      </header>

      <main class="flex-1 p-3 bg-white dark:bg-neutral-900">
        <NuxtPage />
      </main>

      <footer class="flex justify-between p-3 bg-neutral-200 dark:bg-neutral-800">
        <p>
          Made with ❤ by
          <NuxtLink target="_blank" to="https://github.com/misaon">
            @misaon
          </NuxtLink>
        </p>
        <p>
          Powered by 💚 of
          <NuxtLink target="_blank" to="https://github.com/nuxt/framework">
            Nuxt 3
          </NuxtLink>
        </p>
      </footer>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import IconApp from '~icons/material-symbols/shutter-speed'
import IconDark from '~icons/material-symbols/dark-mode-outline'
import IconAddToList from '~icons/material-symbols/playlist-add-circle-outline'

const colorMode = useColorMode()

function handleDarkModeSwitch () {
  colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light'
}
</script>
