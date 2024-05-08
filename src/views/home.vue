<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { useHead } from '@unhead/vue'
const getSiteMetadata = async () =>
  new Promise<{ title: string }>((resolve) => {
    setTimeout(() => {
      resolve({ title: 'Website Title' })
    }, 4000)
  })

const metadata = await getSiteMetadata()
console.log('ini', metadata)
useHead({
  title: metadata?.title ?? 'unknown',
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
