import { Providers } from './providers';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Blogify | Kişisel Blog',
  description: 'Blogify resmi web sitesi. Yazılar, şiirler ve makaleler.',
  keywords: 'Blogify, blog, yazar, şair, makale, edebiyat',
  authors: [{ name: 'Blogify' }],
  openGraph: {
    title: 'Blogify | Kişisel Blog',
    description: 'Blogify resmi web sitesi. Yazılar, şiirler ve makaleler.',
    url: 'https://blogify.com',
    siteName: 'Blogify',
    locale: 'tr_TR',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'YOUR-GA-ID');
            `,
          }}
        />
        <meta 
          name="google-site-verification" 
          content="s8Y6BToup474EroY1_Y9QROxXuPhl4mAGE"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
