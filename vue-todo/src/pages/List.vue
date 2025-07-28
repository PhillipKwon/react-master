<template>
  <div class="space-y-8">
    <!-- 필터 및 정렬 섹션 -->
    <div class="">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <h2 class="text-2xl font-bold text-gray-800">
            {{ getFilterTitle() }}
          </h2>
          <!-- 하루 이상 지난 완료된 할일 관리 버튼 -->
          <div v-if="todoStore.expiredCompletedTodos.length > 0" class="ml-4">
            <button
              @click="handleClearExpired"
              class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors"
              title="하루 이상 지난 완료된 할일 영구 삭제"
            >
              만료된 할일 정리 ({{ todoStore.expiredCompletedTodos.length }}개)
            </button>
          </div>
          <span
            class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors"
            :class="{
              'ring-2 ring-blue-500': todoStore.currentFilter === 'all',
            }"
            @click="handleFilter('all')"
            >{{ todoStore.totalTodos }}개</span
          >
          <span
            class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors"
            :class="{
              'ring-2 ring-gray-500': todoStore.currentFilter === 'doing',
            }"
            @click="handleFilter('doing')"
            >{{ todoStore.activeCount }}개</span
          >
          <span
            class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium cursor-pointer hover:bg-green-200 transition-colors"
            :class="{
              'ring-2 ring-green-500': todoStore.currentFilter === 'done',
            }"
            @click="handleFilter('done')"
            >{{ todoStore.completedCount }}개</span
          >
          <span
            class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium cursor-pointer hover:bg-red-200 transition-colors"
            :class="{
              'ring-2 ring-red-500': todoStore.currentFilter === 'deleted',
            }"
            @click="handleFilter('deleted')"
            >{{ todoStore.deletedTodos.length }}개</span
          >
        </div>
      </div>
    </div>

    <!-- 필터링된 할일 목록 -->
    <div v-if="todoStore.filteredTodos.length > 0">
      <!-- 진행중인 할일 -->
      <div
        v-if="
          todoStore.currentFilter === 'all' ||
          todoStore.currentFilter === 'doing'
        "
      >
        <div
          v-if="
            todoStore.currentFilter === 'all' &&
            todoStore.activeTodos.length > 0
          "
        >
          <h3 class="text-lg font-semibold text-gray-700 mb-4">
            진행중인 할일
          </h3>
        </div>
        <todo-card
          v-for="todo in todoStore.currentFilter === 'all'
            ? todoStore.activeTodos
            : todoStore.filteredTodos"
          :key="todo.id"
          :todo="todo"
          class="mb-4 last:mb-0"
        />
      </div>

      <!-- 완료된 할일 -->
      <div
        v-if="
          todoStore.currentFilter === 'all' &&
          todoStore.completedTodos.length > 0
        "
      >
        <h3 class="text-lg font-semibold text-gray-700 mb-4 mt-8">
          완료된 할일
        </h3>
        <div class="space-y-4">
          <div
            v-for="todo in todoStore.completedTodos"
            :key="todo.id"
            class="rounded-full bg-green-50 border-2 border-green-200 h-[80px] flex items-center px-8 py-4 justify-between"
          >
            <div class="flex items-center space-x-3">
              <span class="text-lg line-through text-green-600">{{
                todo.title
              }}</span>
              <button
                @click="todoStore.toggleTodoStatus(todo.id)"
                class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors"
              >
                되돌리기
              </button>
            </div>
            <div v-if="todo.dueDate" class="text-sm text-green-600">
              {{ todo.dueDate }}
            </div>
          </div>
        </div>
      </div>

      <!-- 완료된 할일 (필터 모드) -->
      <div v-if="todoStore.currentFilter === 'done'">
        <div class="space-y-4">
          <div
            v-for="todo in todoStore.filteredTodos"
            :key="todo.id"
            class="rounded-full bg-green-50 border-2 border-green-200 h-[80px] flex items-center px-8 py-4 justify-between"
          >
            <div class="flex items-center space-x-3">
              <span class="text-lg line-through text-green-600">{{
                todo.title
              }}</span>
              <button
                @click="todoStore.toggleTodoStatus(todo.id)"
                class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors"
              >
                되돌리기
              </button>
            </div>
            <div v-if="todo.dueDate" class="text-sm text-green-600">
              {{ todo.dueDate }}
            </div>
          </div>
        </div>
      </div>

      <!-- 삭제된 할일 -->
      <div v-if="todoStore.currentFilter === 'deleted'">
        <div class="space-y-4">
          <div
            v-for="todo in todoStore.filteredTodos"
            :key="todo.id"
            class="rounded-full bg-red-50 border-2 border-red-200 h-[80px] flex items-center px-8 py-4 justify-between"
          >
            <div class="flex items-center space-x-3">
              <span class="text-lg line-through text-red-600">{{
                todo.title
              }}</span>
              <div class="flex space-x-2">
                <button
                  @click="todoStore.restoreTodo(todo.id)"
                  class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium hover:bg-red-200 transition-colors"
                >
                  복원
                </button>
                <button
                  @click="todoStore.permanentlyDeleteTodo(todo.id)"
                  class="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  영구삭제
                </button>
              </div>
            </div>
            <div v-if="todo.dueDate" class="text-sm text-red-600">
              {{ todo.dueDate }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 빈 상태 -->
    <div v-else class="text-center py-12">
      <div class="text-gray-500 text-lg">
        {{ getEmptyMessage() }}
      </div>
    </div>

    <!-- 새로운 할일 추가 -->
    <div class="flex items-center space-x-4">
      <create-todo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import CreateTodo from '@/components/CreateTodo.vue'
import TodoCard from '@/components/TodoCard.vue'
import { useTodoStore } from '@/stores/todo'

const todoStore = useTodoStore()

const handleFilter = (filter: 'all' | 'doing' | 'done' | 'deleted') => {
  todoStore.setFilter(filter)
}

const getFilterTitle = () => {
  switch (todoStore.currentFilter) {
    case 'doing':
      return '진행중인 할일'
    case 'done':
      return '완료된 할일'
    case 'deleted':
      return '삭제된 할일'
    default:
      return '전체 할일'
  }
}

const getEmptyMessage = () => {
  switch (todoStore.currentFilter) {
    case 'doing':
      return '진행중인 할일이 없습니다.'
    case 'done':
      return '완료된 할일이 없습니다.'
    case 'deleted':
      return '삭제된 할일이 없습니다.'
    default:
      return '할일이 없습니다. 새로운 할일을 추가해보세요!'
  }
}

const handleClearExpired = () => {
  if (confirm('하루 이상 지난 완료된 할일을 영구 삭제하시겠습니까?')) {
    todoStore.clearExpiredCompletedTodos()
  }
}

onMounted(() => {
  todoStore.initialize()
})
</script>
