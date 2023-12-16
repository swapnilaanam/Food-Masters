import { Kanit } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/providers/AuthProvider';
import QueryProvider from '@/providers/QueryProvider';
import CartProvider from '@/providers/CartProvider';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const kanit = Kanit({ subsets: ['latin'], weight: ["400", "500", "600", "700"], variable: '--font-kanit' });

export const metadata = {
  title: 'Food Masters || Home',
  description: 'Food Masters - Best Food Delivery App In The Town',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${kanit.className}`}>
        <AuthProvider>
          <QueryProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </QueryProvider>
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
