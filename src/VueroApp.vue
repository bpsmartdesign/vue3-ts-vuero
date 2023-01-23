<script setup lang="ts">
import { initDarkmode } from '/@src/stores/darkmode'

initDarkmode()
</script>

<template>
  <div>
    <Suspense>
      <RouterView v-slot="{ Component }">
        <Transition name="fade-slow" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </Suspense>
    <ClientOnly>
      <VReloadPrompt app-name="App Name" />
    </ClientOnly>
  </div>
</template>
