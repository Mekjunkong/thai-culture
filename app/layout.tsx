import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://thailessonschiangmai.com'),
  title: 'Thai Lessons Chiang Mai | Learn Thai for Expats & Travelers',
  description:
    'Practical Thai lessons in Chiang Mai and online for expats, digital nomads, retirees, and travelers. Start free, then book private Thai practice.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Thai Lessons Chiang Mai',
    description: 'Thai lessons in Chiang Mai and online for expats, travelers, food, markets, prices, polite phrases, and culture.',
    url: '/',
    siteName: 'Thai Lessons Chiang Mai',
    images: [
      {
        url: '/assets/images/thai-culture-homepage-banner.png',
        width: 1536,
        height: 1024,
        alt: 'Thai Lessons Chiang Mai course and private lessons',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thai Lessons Chiang Mai',
    description: 'Practical Thai lessons in Chiang Mai and online for expats and travelers.',
    images: ['/assets/images/thai-culture-homepage-banner.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
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
