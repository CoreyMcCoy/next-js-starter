import { ThemeProvider } from '@/components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NextJS Starter Template',
  description:
    'Boilerplate for Next.js projects with Tailwind CSS, MongoDB and Clerk authentication.',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        {/* Use this to use a custom font: style={{ fontFamily: 'Font Name' }} */}
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">
              <div className="container max-w-6xl py-24">{children}</div>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
