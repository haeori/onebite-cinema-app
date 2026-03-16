import { ReactNode } from 'react';
import '@/app/globals.css';
import style from '@/styles/global-layout.module.css';
import Link from 'next/link';
import NextTopLoader from 'nextjs-toploader';

export const metadata = {
  title: '한입시네마',
  description: '한입시네마에서 다채로운 영화들을 만나보세요',
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
