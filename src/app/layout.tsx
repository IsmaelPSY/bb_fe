import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Boutique Belen | Home',
  description: 'Ropa para el engreído del hogar, en los mejores modelos, con la mejor calidad y el mejor precio.',
  openGraph: {
    title: 'Boutique Belen | Home',
    description: 'Ropa para el engreído del hogar, en los mejores modelos, con la mejor calidad y el mejor precio.',
    url: 'https://bbelen.vercel.app/home',
    siteName: 'Boutique Belen',
    locale: 'es_ES',
    type: 'website',
    countryName: 'PE',
    images: 'https://res.cloudinary.com/ddr6m52rr/image/upload/v1704137177/tsislb68rjgpfvshlq3d.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
