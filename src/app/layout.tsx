import { ReactNode } from 'react';

export const metadata = {
  title: '한입시네마',
  description: '한입시네마에서 다채로운 영화들을 만나보세요',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
