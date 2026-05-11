import {
  Link,
  Outlet,
  createRootRouteWithContext,
  useRouter,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'

import '../styles.css'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootComponent,
  notFoundComponent: NotFound,
})

function NotFound() {
  const router = useRouter()
  return (
    <section className="max-w-3xl mx-auto px-6 py-20 text-center">
      <p className="text-sm font-medium text-indigo-600">404</p>
      <h1 className="mt-2 text-4xl font-bold text-slate-900">
        Page not found
      </h1>
      <p className="mt-4 text-slate-600">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => router.history.back()}
          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50"
        >
          Go back
        </button>
        <Link
          to="/"
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-indigo-500"
        >
          Take me home
        </Link>
      </div>
    </section>
  )
}

function RootComponent() {
  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b border-slate-200 bg-white">
        <nav className="max-w-3xl mx-auto flex items-center gap-6 px-6 py-4">
          <Link
            to="/"
            className="text-slate-900 font-semibold"
            activeProps={{ className: 'text-indigo-600' }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to="/todos"
            className="text-slate-700 hover:text-indigo-600"
            activeProps={{ className: 'text-indigo-600' }}
          >
            Todos
          </Link>
        </nav>
      </header>
      <main className="flex-1 bg-slate-50">
        <Outlet />
      </main>
      <TanStackDevtools
        config={{ position: 'bottom-right' }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          {
            name: 'TanStack Query',
            render: <ReactQueryDevtoolsPanel />,
          },
        ]}
      />
    </div>
  )
}
