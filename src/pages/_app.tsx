import { useEffect } from 'react'
import { useRouter } from 'next/router'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { supabase } from '@/utils/supabase'
import '@/styles/globals.css'

export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case 'FCP':
      console.log(`FCP: ${Math.round(metric.value * 10) / 10}`)
      break
    case 'LCP':
      console.log(`LCP: ${Math.round(metric.value * 10) / 10}`)
      break
    case 'TTFB':
      console.log(`TTFB: ${Math.round(metric.value * 10) / 10}`)
      break
    case 'Next.js-hydration':
      console.log(
        `Hydration: ${Math.round(metric.startTime * 10) / 10} -> ${
          Math.round((metric.startTime + metric.value) * 10) / 10
        }`
      )
      break
    default:
      break
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  const { push, pathname } = useRouter()

  supabase.auth.onAuthStateChange(async (event) => {
    if (event === 'SIGNED_IN' && pathname === '/') {
      await push('/dashboard')
    }
    if (event === 'SIGNED_OUT' && pathname !== '/') {
      await push('/')
    }
  })

  const validateSession = async () => {
    const user = supabase.auth.user()
    if (user && pathname === '/') {
      await push('/dashboard')
    } else if (!user && pathname !== '/') {
      await push('/')
    }
  }

  useEffect(() => {
    validateSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
