import type { Metadata, Viewport } from 'next'
import { Inter, Newsreader, Public_Sans } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  style: ['normal', 'italic'],
  axes: ['opsz'],
})
const publicSans = Public_Sans({ subsets: ['latin'], variable: '--font-public-sans' })

export const metadata: Metadata = {
  metadataBase: new URL('https://thailessonschiangmai.com'),
  title: 'Thai Lessons Chiang Mai | Learn Thai for Expats & Travelers',
  description:
    'Practical Thai lessons in Chiang Mai and online for expats, digital nomads, retirees, and travelers. Start free, then book private Thai practice.',
  icons: {
    icon: [
      { url: '/assets/brand/favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/brand/logo-mark-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/assets/brand/logo-mark-512.png', sizes: '512x512', type: 'image/png' }],
  },
  openGraph: {
    title: 'Thai Lessons Chiang Mai',
    description: 'Thai lessons in Chiang Mai and online for expats, travelers, food, markets, prices, polite phrases, and culture.',
    url: '/',
    siteName: 'Thai Lessons Chiang Mai',
    images: [
      {
        url: '/assets/brand/og-thai-lessons-chiang-mai.png',
        width: 1200,
        height: 630,
        alt: 'Thai Lessons Chiang Mai - real-life Thai missions for expats',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thai Lessons Chiang Mai',
    description: 'Practical Thai lessons in Chiang Mai and online for expats and travelers.',
    images: ['/assets/brand/og-thai-lessons-chiang-mai.png'],
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
      <body className={`${inter.variable} ${newsreader.variable} ${publicSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
