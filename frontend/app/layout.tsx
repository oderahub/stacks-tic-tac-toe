import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tic Tac Toe',
  description: 'Play Tic Tac Toe on Stacks'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
