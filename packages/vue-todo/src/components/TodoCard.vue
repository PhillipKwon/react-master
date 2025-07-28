<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'

import { useTodoStore } from '@/stores/todo'
import type { Todo } from '@/types/Todo'

const props = defineProps<{
  todo: Todo
}>()

const todoStore = useTodoStore()

const isEditing = ref(false)
const editedTitle = ref(props.todo.title)
const editInput = ref<HTMLInputElement | null>(null)

// 스와이프 관련 상태
const isDragging = ref(false)
const startX = ref(0)
const currentX = ref(0)
const translateX = ref(0)
const cardRef = ref<HTMLElement | null>(null)

// isEditing이 true로 바뀔 때 input에 포커스
watch(isEditing, val => {
  if (val) {
    nextTick(() => {
      editInput.value?.focus()
    })
  }
})

const handleClick = () => {
  isEditing.value = true
  editedTitle.value = props.todo.title
}

const handleSave = () => {
  if (editedTitle.value.trim()) {
    todoStore.updateTodo(props.todo.id, {
      title: editedTitle.value.trim(),
    })
  }
  isEditing.value = false
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSave()
  } else if (event.key === 'Escape') {
    isEditing.value = false
    editedTitle.value = props.todo.title
  }
}

// 터치/마우스 이벤트 핸들러
const handleTouchStart = (event: TouchEvent | MouseEvent) => {
  if (isEditing.value) return

  isDragging.value = true
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
  startX.value = clientX
  currentX.value = clientX
}

const handleTouchMove = (event: TouchEvent | MouseEvent) => {
  if (!isDragging.value) return

  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
  currentX.value = clientX
  translateX.value = currentX.value - startX.value

  // 스와이프 범위 제한
  translateX.value = Math.max(-100, Math.min(100, translateX.value))
}

const handleTouchEnd = () => {
  if (!isDragging.value) return

  isDragging.value = false
  const threshold = 60

  if (translateX.value > threshold) {
    // 오른쪽으로 충분히 스와이프 - 완료 처리
    todoStore.toggleTodoStatus(props.todo.id)
  } else if (translateX.value < -threshold) {
    // 왼쪽으로 충분히 스와이프 - 삭제
    todoStore.deleteTodo(props.todo.id)
  }

  // 원래 위치로 복귀
  translateX.value = 0
}

// 마우스 이벤트를 위한 별도 핸들러
const handleMouseDown = (event: MouseEvent) => {
  event.preventDefault()
  handleTouchStart(event)
}

const handleMouseMove = (event: MouseEvent) => {
  if (isDragging.value) {
    handleTouchMove(event)
  }
}

const handleMouseUp = () => {
  handleTouchEnd()
}
</script>

<template>
  <div
    ref="cardRef"
    class="rounded-full bg-white border-2 h-[80px] relative overflow-hidden cursor-grab active:cursor-grabbing transition-all duration-300 border-blue-300 hover:border-blue-500"
    :style="{ transform: `translateX(${translateX}px)` }"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
  >
    <!-- 배경 액션 영역들 -->
    <div class="absolute inset-0 flex pointer-events-none">
      <!-- 삭제 영역 (왼쪽) -->
      <div class="w-24 bg-red-500 flex items-center justify-center">
        <span class="text-white font-medium">삭제</span>
      </div>
      <!-- 완료 영역 (오른쪽) -->
      <div class="w-24 bg-green-500 ml-auto flex items-center justify-center">
        <span class="text-white font-medium">완료</span>
      </div>
    </div>

    <!-- 카드 내용 -->
    <div
      class="relative bg-white h-full flex items-center px-8 py-4 justify-between"
    >
      <div>
        <span
          v-if="!isEditing"
          class="text-lg cursor-pointer"
          @click="handleClick"
        >
          {{ todo.title }}
        </span>
        <input
          v-else
          v-model="editedTitle"
          type="text"
          class="text-lg focus:outline-none"
          @keydown="handleKeyDown"
          @blur="handleSave"
          ref="editInput"
          autofocus
        />
      </div>
      <div v-if="todo.dueDate" class="flex items-center space-x-3 mt-2">
        <span
          class="px-3 py-1 text-xs rounded-full font-medium flex items-center"
        >
          {{ todo.dueDate }}
        </span>
      </div>
    </div>
  </div>
</template>
