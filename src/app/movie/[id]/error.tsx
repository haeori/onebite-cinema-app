'use client';

import { startTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import style from '@/styles/notfound.module.css';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div className={style.container}>
      <div className={style.icon}>🎬</div>
      <h1 className={style.title}>오류가 발생했습니다</h1>
      <p className={style.description}>
        영화 정보를 불러오는 중 문제가 발생했습니다.
        <br />
        잠시 후 다시 시도해주세요.
      </p>
      <button
        className={style.button}
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
