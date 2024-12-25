import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar1 from '../components/landing-page/navbar';
import Footer from '../components/landing-page/footer';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Eduardo Melo - Desenvolvedor Web',
  description:
    'Sou Eduardo Melo, desenvolvedor frontend especializado em React, Next.js, e TypeScript. Transformo ideias em experiências digitais únicas e eficientes.',
  keywords:
    'Eduardo Melo, desenvolvedor web, frontend, React, Next.js, TypeScript, desenvolvimento web, experiências digitais, soluções personalizadas',
  authors: [{ name: 'Eduardo Melo', url: 'https://eduardomelo.dev' }],
  creator: 'Eduardo Melo',
  openGraph: {
    title: 'Eduardo Melo - Desenvolvedor Web',
    description:
      'Desenvolvedor frontend especializado em criar experiências digitais únicas usando React, Next.js e TypeScript.',
    url: 'https://eduardomelo.dev',
    siteName: 'Eduardo Melo - Desenvolvedor Web',
    type: 'website',
    images: [
      {
        url: '/og-image.png', // Certifique-se de ter essa imagem na pasta pública
        width: 1200,
        height: 630,
        alt: 'Eduardo Melo - Desenvolvedor Web',
      },
    ],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eduardo Melo - Desenvolvedor Web',
    description:
      'Sou Eduardo Melo, desenvolvedor especializado em React, Next.js e TypeScript, criando experiências digitais incríveis.',
    creator: '@seuTwitter', // Altere para seu handle do Twitter
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico', // Certifique-se de ter um favicon.ico na pasta pública
    apple: '/apple-touch-icon.png', // Apple Touch Icon para dispositivos iOS
  },
  themeColor: '#ffffff', // Cor do tema (ajuda para dispositivos móveis e navegadores)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Meta tags adicionais para SEO */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="google-site-verification"
          content="seu_token_google" // Substitua pelo token gerado no Google Search Console
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <link rel="manifest" href="/site.webmanifest" /> {/* Manifesto PWA */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-10 px-5">
          <Navbar1 />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
