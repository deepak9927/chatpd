import './global.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/header'
import { SocketProvider } from '@/components/providers/socket-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ModalProvider } from '@/components/providers/modal-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Project Hub - B2B Project Management',
  description: 'Enterprise project management and collaboration platform',
}

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <ClerkProvider>
            <QueryClientProvider client={queryClient}>
              <SocketProvider>
                <ModalProvider />
                <Header />
                <main className="flex-1 overflow-y-auto">
                  {children}
                </main>
                <Toaster />
              </SocketProvider>
            </QueryClientProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
