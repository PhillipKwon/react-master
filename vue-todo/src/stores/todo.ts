import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import type { Todo } from '@/types/Todo'

const STORAGE_KEY = 'vue-todo-tasks'

export const useTodoStore = defineStore('todo', () => {
  // 상태
  const todos = ref<Todo[]>([])
  const isLoading = ref(false)
  const currentFilter = ref<'all' | 'doing' | 'done' | 'deleted'>('all')

  // 로컬 스토리지에서 데이터 로드
  const loadFromStorage = (): void => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        todos.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('로컬 스토리지에서 데이터 로드 실패:', error)
      todos.value = []
    }
  }

  // 로컬 스토리지에 데이터 저장
  const saveToStorage = (): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
    } catch (error) {
      console.error('로컬 스토리지에 데이터 저장 실패:', error)
    }
  }

  // 계산된 속성
  const activeTodos = computed(() =>
    todos.value.filter(todo => todo.status === 'doing')
  )

  const completedTodos = computed(() =>
    todos.value.filter(todo => {
      if (todo.status !== 'done') return false

      // dueDate가 없으면 표시
      if (!todo.dueDate) return true

      // 오늘 날짜 계산
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      // dueDate 파싱
      const dueDate = new Date(todo.dueDate)
      dueDate.setHours(0, 0, 0, 0)

      // 하루 이상 지났는지 확인 (86400000ms = 24시간)
      const oneDayInMs = 86400000
      const timeDiff = today.getTime() - dueDate.getTime()

      // 하루 이상 지나지 않았으면 표시
      return timeDiff < oneDayInMs
    })
  )

  // 하루 이상 지난 완료된 할일들
  const expiredCompletedTodos = computed(() =>
    todos.value.filter(todo => {
      if (todo.status !== 'done') return false

      // dueDate가 없으면 제외
      if (!todo.dueDate) return false

      // 오늘 날짜 계산
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      // dueDate 파싱
      const dueDate = new Date(todo.dueDate)
      dueDate.setHours(0, 0, 0, 0)

      // 하루 이상 지났는지 확인
      const oneDayInMs = 86400000
      const timeDiff = today.getTime() - dueDate.getTime()

      // 하루 이상 지났으면 포함
      return timeDiff >= oneDayInMs
    })
  )

  const deletedTodos = computed(() =>
    todos.value.filter(todo => todo.status === 'deleted')
  )

  const totalTodos = computed(() => todos.value.length)
  const activeCount = computed(() => activeTodos.value.length)
  const completedCount = computed(() => completedTodos.value.length)

  // 필터링된 할일 목록
  const filteredTodos = computed(() => {
    switch (currentFilter.value) {
      case 'doing':
        return activeTodos.value
      case 'done':
        return completedTodos.value
      case 'deleted':
        return deletedTodos.value
      default:
        return todos.value
    }
  })

  // 액션
  const addTodo = (todo: Omit<Todo, 'id'>): void => {
    const newTodo: Todo = {
      ...todo,
      id: Date.now(),
    }
    todos.value.push(newTodo)
    saveToStorage()
  }

  const updateTodo = (id: number, updates: Partial<Todo>): void => {
    const index = todos.value.findIndex(todo => todo.id === id)
    if (index !== -1) {
      todos.value[index] = { ...todos.value[index], ...updates }
      saveToStorage()
    }
  }

  const deleteTodo = (id: number): void => {
    const index = todos.value.findIndex(todo => todo.id === id)
    if (index !== -1) {
      todos.value[index].status = 'deleted'
      saveToStorage()
    }
  }

  const toggleTodoStatus = (id: number): void => {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.status = todo.status === 'doing' ? 'done' : 'doing'
      saveToStorage()
    }
  }

  const restoreTodo = (id: number): void => {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.status = 'doing'
      saveToStorage()
    }
  }

  const permanentlyDeleteTodo = (id: number): void => {
    const index = todos.value.findIndex(todo => todo.id === id)
    if (index !== -1) {
      todos.value.splice(index, 1)
      saveToStorage()
    }
  }

  const clearCompletedTodos = (): void => {
    todos.value = todos.value.filter(todo => todo.status !== 'done')
    saveToStorage()
  }

  const clearDeletedTodos = (): void => {
    todos.value = todos.value.filter(todo => todo.status !== 'deleted')
    saveToStorage()
  }

  // 하루 이상 지난 완료된 할일들 영구 삭제
  const clearExpiredCompletedTodos = (): void => {
    todos.value = todos.value.filter(todo => {
      if (todo.status !== 'done') return true

      // dueDate가 없으면 유지
      if (!todo.dueDate) return true

      // 오늘 날짜 계산
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      // dueDate 파싱
      const dueDate = new Date(todo.dueDate)
      dueDate.setHours(0, 0, 0, 0)

      // 하루 이상 지났는지 확인
      const oneDayInMs = 86400000
      const timeDiff = today.getTime() - dueDate.getTime()

      // 하루 이상 지나지 않았으면 유지
      return timeDiff < oneDayInMs
    })
    saveToStorage()
  }

  // 필터 변경
  const setFilter = (filter: 'all' | 'doing' | 'done' | 'deleted'): void => {
    currentFilter.value = filter
  }

  // 초기화
  const initialize = (): void => {
    loadFromStorage()
  }

  return {
    // 상태
    todos,
    isLoading,
    currentFilter,

    // 계산된 속성
    activeTodos,
    completedTodos,
    expiredCompletedTodos,
    deletedTodos,
    totalTodos,
    activeCount,
    completedCount,
    filteredTodos,

    // 액션
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodoStatus,
    restoreTodo,
    permanentlyDeleteTodo,
    clearCompletedTodos,
    clearDeletedTodos,
    clearExpiredCompletedTodos,
    setFilter,
    initialize,
  }
})
