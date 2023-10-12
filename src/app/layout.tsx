import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crime PDF | Realassist.ai ',
  description: 'RealAssist is a revolutionary AI-powered tool providing comprehensive and insightful real estate reports to empower informed property decisions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en">
        <body className={poppins.className}>{children}</body>
      </html>
    </>
  )
}
