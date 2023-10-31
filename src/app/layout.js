import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/providers/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Food Masters || Home',
  description: 'Food Masters - Best Food Delivery App In The Town',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
