<script setup lang="ts">
import { onMounted } from 'vue'

import List from './pages/List.vue'

import { useTodoStore } from '@/stores/todo'

const todoStore = useTodoStore()

onMounted(() => {
  todoStore.initialize()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 메인 컨텐츠 -->
    <main class="max-w-6xl mx-auto">
      <List />
    </main>
  </div>
</template>
