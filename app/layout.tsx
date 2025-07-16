import './globals.css';
import { Inter } from 'next/font/google';
import TransitionProvider from '@/components/TransitionProvider';
import TransitionWrapper from '@/components/TransitionWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Atharva Portfolio',
  description: 'My personal portfolio site',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TransitionProvider>
          <TransitionWrapper>{children}</TransitionWrapper>
        </TransitionProvider>
      </body>
    </html>
  );
}
