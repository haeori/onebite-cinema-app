import style from '@/styles/loading.module.css';

export const Loading = ({ text = '삭제 중입니다...', size = 'large' }: { text?: string; size?: 'small' | 'large' }) => {
  return (
    <div className={`${style.container} ${size === 'small' ? style.small : ''}`} role="status" aria-live="polite" aria-busy="true">
      <div className={`${style.spinner} ${size === 'small' ? style.spinnerSmall : ''}`} aria-hidden="true"></div>
      <p className={`${style.text} ${size === 'small' ? style.textSmall : ''}`}>{text}</p>
    </div>
  );
};
