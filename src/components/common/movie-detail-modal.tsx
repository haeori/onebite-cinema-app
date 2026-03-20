'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/movie-detail-modal.module.css';

interface MovieDetailModalProps {
  children: ReactNode;
}

export default function MovieDetailModal({ children }: MovieDetailModalProps) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC 키 눌렀을 때 뒤로가기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.back();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  // body 스크롤 막기 (원래 값 보존)
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // 배경 클릭 시 뒤로가기
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      router.back();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackgroundClick}>
      <div className={styles.modal} ref={modalRef}>
        {children}
      </div>
    </div>
  );
}
