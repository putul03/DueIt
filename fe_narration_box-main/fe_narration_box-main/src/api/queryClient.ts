import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000,
      refetchOnWindowFocus: true,
      retry: 3,
      refetchOnReconnect: true,
      refetchOnMount: true
    }
  }
})

export default queryClient
