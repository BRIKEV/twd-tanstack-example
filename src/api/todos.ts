export type Todo = {
  id: string
  title: string
  description: string
  date: string
}

export type NewTodo = Omit<Todo, 'id'>

const BASE_URL = '/api/todos'

export async function getTodos(): Promise<Array<Todo>> {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error(`Failed to load todos (${res.status})`)
  return res.json()
}

export async function createTodo(body: NewTodo): Promise<Todo> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Failed to create todo (${res.status})`)
  return res.json()
}

export async function deleteTodo(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`Failed to delete todo (${res.status})`)
}
