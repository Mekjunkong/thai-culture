import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Thai Culture & Language | Learn Thai Online',
  description:
    'Master Thai language and culture through structured lessons, audio guides, and cultural deep-dives — designed for a global audience.',
  openGraph: {
    title: 'Thai Culture & Language',
    description: 'Learn Thai for the real world — language + culture together.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
