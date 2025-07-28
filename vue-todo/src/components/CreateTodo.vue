<template>
  <div class="w-full">
    <div class="space-y-6">
      <!-- 제목 입력 -->
      <div class="group">
        <label class="block text-sm font-semibold text-gray-700 mb-3">
          제목
        </label>
        <div class="relative">
          <input
            v-model="title"
            type="text"
            class="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
            placeholder="할일 제목을 입력하세요"
            @keydown.enter="handleCreateTodo"
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-4">
            <Edit class="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      <!-- 날짜 선택 -->
      <div class="group">
        <label class="block text-sm font-semibold text-gray-700 mb-3">
          날짜
        </label>
        <div class="relative">
          <input
            v-model="dueDate"
            type="date"
            class="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
          />
        </div>
      </div>

      <!-- 추가 버튼 -->
      <div class="pt-4">
        <button
          :disabled="!title.trim()"
          class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          @click="handleCreateTodo"
        >
          <div class="flex items-center justify-center">
            <Plus class="w-5 h-5 mr-2" />
            할일 추가하기
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit, Plus } from 'lucide-vue-next'
import { ref } from 'vue'

import { useTodoStore } from '@/stores/todo'

const todoStore = useTodoStore()

const title = ref('')
const dueDate = ref('')

const handleCreateTodo = () => {
  if (!title.value.trim()) return

  todoStore.addTodo({
    title: title.value.trim(),
    status: 'doing',
    dueDate: dueDate.value || undefined,
  })

  // 폼 초기화
  title.value = ''
  dueDate.value = ''
}
</script>
