import { createRouter } from '@tanstack/react-router'
import { queryClient } from './query-client'
import { routeTree } from './routeTree.gen'

export function createAppRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    context: { queryClient },
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createAppRouter>
  }
}
