import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Undangan Upacara Adat',
  description: 'Undangan digital upacara adat Bali',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
