import { Kanit } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/providers/AuthProvider';

const kanit = Kanit({subsets: ['latin'], weight: ["400", "500", "600", "700"], variable: '--font-kanit'});

export const metadata = {
  title: 'Food Masters || Home',
  description: 'Food Masters - Best Food Delivery App In The Town',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${kanit.className}`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
