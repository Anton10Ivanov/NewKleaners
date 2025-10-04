import { Inter } from 'next/font/google';

import type { Metadata } from 'next';

import { AuthProvider } from '@/components/providers/AuthProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kleaners - Professional Cleaning Services',
  description: 'Connecting customers with verified cleaning service providers',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
