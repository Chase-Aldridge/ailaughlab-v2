import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'AI Laugh Lab - AI Comedy Community',
  description: 'The AI comedy community where we turn robots into stand-up comedians. Join 100+ creators experimenting with AI humor.',
  metadataBase: new URL('https://ailaughlab.com'),
  openGraph: {
    title: 'AI Laugh Lab',
    description: 'The AI comedy community. Make AI actually funny.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="ai-lab" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  )
}
