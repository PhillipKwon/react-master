export interface Todo {
  id: number
  title: string
  status: 'doing' | 'done' | 'deleted'
  dueDate?: string
}
