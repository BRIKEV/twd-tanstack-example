import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [count, setCount] = useState(0)

  return (
    <section className="max-w-3xl mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl font-bold text-slate-900">Welcome to TWD</h1>
      <p className="mt-4 text-lg text-slate-600">
        A TanStack Router + Query + Form demo, tested with TWD.
      </p>
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="mt-8 inline-flex items-center rounded-md bg-indigo-600 px-5 py-2.5 text-white font-medium shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Count is {count}
      </button>
    </section>
  )
}
