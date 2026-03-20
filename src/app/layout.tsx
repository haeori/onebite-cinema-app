import { ReactNode } from 'react';
import '@/app/globals.css';
import style from '@/styles/global-layout.module.css';
import Link from 'next/link';
import NextTopLoader from 'nextjs-toploader';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: {
    template: '%s | 한입시네마',
    default: '한입시네마',
  },
  description: '한입시네마에서 다채로운 영화들을 만나보세요',
  keywords: ['영화', '영화 추천', '한입시네마', '영화 정보'],
  authors: [{ name: 'Haeori' }],
  creator: 'Haeori',
  publisher: 'ONEBITE CINEMA',
  openGraph: {
    title: '한입시네마',
    description: '한입시네마에서 다채로운 영화들을 만나보세요',
    siteName: '한입시네마',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/thumbnail.png',
        width: 1200,
        height: 630,
        alt: '한입시네마',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <NextTopLoader color="#6b1fa8" height={4} showSpinner={false} />
        <div className={style.container}>
          <Link href="/">
            <div className={style.siteTitle}>
              <span className={style.logoIcon}>🎬</span>
              <span className={style.logoText}>
                <span className={style.logoBrand}>ONEBITE</span>
                <span className={style.logoSub}>CINEMA</span>
              </span>
            </div>
          </Link>
          <div className={style.content}>{children}</div>
        </div>
      </body>
    </html>
  );
}
