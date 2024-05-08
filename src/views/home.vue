<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { useHead } from '@unhead/vue'
useHead({
  title: 'Website Title',
  meta: [
    {
      name: 'description',
      content: 'Website description'
    }
  ]
})
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
