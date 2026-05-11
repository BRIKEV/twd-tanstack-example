import { queryOptions } from '@tanstack/react-query'
import { getTodos } from './todos'

export const todosQueryOptions = queryOptions({
  queryKey: ['todos'],
  queryFn: getTodos,
})
