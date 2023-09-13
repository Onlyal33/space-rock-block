import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Space Rock Blocker',
  description: 'Block unwanted space rocks',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>{children}</body>
    </html>
  );
}
