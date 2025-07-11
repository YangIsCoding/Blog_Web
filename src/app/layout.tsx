// layout.tsx
import React, { FC, ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from './providers';
import ChainBanner from '@/components/Banner/banner';

export const metadata = {
  metadataBase: new URL('https://www.chenpinyangdev.com'),
  title: 'P.Y.CHEN - Home',
  description: "Chen Pin Yang's personal portfolio, showcasing skills, experience, and projects in Fintech and software development.",
  openGraph: {
    title: 'P.Y.CHEN',
    description: "Chen Pin Yang's personal portfolio, showcasing skills, experience, and projects in Fintech and software development.",
    url: 'https://www.chenpinyangdev.com/',
    images: [
      {
        url: 'https://www.chenpinyangdev.com/profile_yang.jpg',
        width: 800,
        height: 600,
        alt: 'Profile Picture',
      },
    ],
    type: 'website',
  },
};

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
        <div className="container">
            <Navbar />
            <ChainBanner />
          {children}
          <Footer />
        </div>
        <Analytics />
          <SpeedInsights />
      </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
