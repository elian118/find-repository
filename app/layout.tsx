import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import Header from '@/components/header';
import ClientLayer from '@/components/client-layer';
import React from 'react';
import Modal from '@/components/modal';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.ttf',
  variable: '--pretendard',
});

export const metadata: Metadata = {
  title: {
    template: 'Foreedom | %s',
    default: 'Foreedom - 포리덤',
  },
  description: '사용자를 찾습니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="myTheme" className="overflow-y-scroll">
      <body className={`${pretendard.variable} relative`}>
        <Header />
        <ClientLayer>
          {children}
          <Modal />
        </ClientLayer>
      </body>
    </html>
  );
}
