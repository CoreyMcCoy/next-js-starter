import { ThemeProvider } from '@/components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import Header from '@/components/Header';
import './globals.css';

export const metadata = {
  title: 'Marketing Copy Generator',
  description: 'Generate marketing copy for your business in seconds.',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body style={{ fontFamily: 'Overused Grotesk' }}>
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
