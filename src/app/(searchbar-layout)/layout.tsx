import { ReactNode, Suspense } from 'react';
import Searchbar from '@/components/common/searchbar';

export default function SearchbarLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<div>검색 바 로딩 중...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </>
  );
}
