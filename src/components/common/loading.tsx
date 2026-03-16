import style from '@/styles/loading.module.css';

export const Loading = () => {
  return (
    <div className={style.container} role="status" aria-live="polite" aria-busy="true">
      <div className={style.spinner} aria-hidden="true"></div>
      <p className={style.text}>조회 중입니다...</p>
    </div>
  );
};
