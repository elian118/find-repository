import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/header';
import ClientLayer from '@/components/client-layer';
import React from 'react';
import Modal from '@/components/modal';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.ttf',
  variable: '--pretendard',
});

export const metadata: Metadata = {
  title: {
    template: 'Github | %s',
    default: 'Github',
  },
  description: '리포지토리',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} className="overflow-y-scroll">
      <body className={`${pretendard.variable} relative`}>
        <NextIntlClientProvider>
          <ClientLayer>
            <Header />
            {children}
            <Modal />
          </ClientLayer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
