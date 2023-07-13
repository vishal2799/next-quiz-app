'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { FC, ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode,
  session: any; // new change
}

const Providers: FC<LayoutProps> = ({ children, session }) => {
  const queryClient = new QueryClient()

  return (
    <SessionProvider session={session}>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
    </SessionProvider>
  )
}

export default Providers