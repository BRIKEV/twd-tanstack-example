import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import { Trash2 } from 'lucide-react'

import { todosQueryOptions } from '#/api/queries'
import { createTodo, deleteTodo } from '#/api/todos'
import type { NewTodo, Todo } from '#/api/todos'

export const Route = createFileRoute('/todos')({
  loader: ({ context }) => context.queryClient.ensureQueryData(todosQueryOptions),
  component: TodosPage,
})

function TodosPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-10 space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Todos</h1>
        <p className="mt-1 text-slate-600">
          Powered by TanStack Router loaders, Query, and Form.
        </p>
      </header>

      <CreateTodoForm />
      <TodoList />
    </section>
  )
}

function CreateTodoForm() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (body: NewTodo) => createTodo(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryOptions.queryKey })
    },
  })

  const form = useForm({
    defaultValues: { title: '', description: '', date: '' } as NewTodo,
    onSubmit: async ({ value, formApi }) => {
      await mutation.mutateAsync(value)
      formApi.reset()
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <form.Field
        name="title"
        validators={{
          onChange: ({ value }) =>
            !value ? 'Title is required' : undefined,
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-1">
            <label htmlFor={field.name} className="text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      <form.Field
        name="description"
        validators={{
          onChange: ({ value }) =>
            !value ? 'Description is required' : undefined,
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-1">
            <label htmlFor={field.name} className="text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              id={field.name}
              name={field.name}
              rows={2}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      <form.Field
        name="date"
        validators={{
          onChange: ({ value }) =>
            !value ? 'Date is required' : undefined,
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-1">
            <label htmlFor={field.name} className="text-sm font-medium text-slate-700">
              Date
            </label>
            <input
              id={field.name}
              name={field.name}
              type="text"
              placeholder="YYYY-MM-DD"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <button
            type="submit"
            disabled={!canSubmit || mutation.isPending}
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || mutation.isPending ? 'Creating…' : 'Create Todo'}
          </button>
        )}
      </form.Subscribe>
    </form>
  )
}

function FieldError({ errors }: { errors: Array<unknown> }) {
  if (!errors.length) return null
  return (
    <p className="text-sm text-rose-600">
      {errors.map((e) => String(e)).join(', ')}
    </p>
  )
}

function TodoList() {
  const { data: todos } = useSuspenseQuery(todosQueryOptions)

  if (todos.length === 0) {
    return (
      <p className="text-slate-500 text-center py-10">
        No todos yet. Create one above!
      </p>
    )
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

function TodoItem({ todo }: { todo: Todo }) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryOptions.queryKey })
    },
  })

  return (
    <li className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{todo.title}</h3>
        <p className="mt-1 text-slate-600">{todo.description}</p>
        <p className="mt-2 text-sm text-slate-500">Date: {todo.date}</p>
      </div>
      <button
        type="button"
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
        aria-label="Delete"
        className="inline-flex items-center gap-1.5 rounded-md border border-rose-200 px-3 py-1.5 text-rose-700 hover:bg-rose-50 disabled:opacity-50"
      >
        <Trash2 size={16} />
        Delete
      </button>
    </li>
  )
}
