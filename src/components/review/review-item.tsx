import { ReviewData } from '@/types/movie-types';
import style from '@/styles/review-item.module.css';

export function ReviewItem({ review }: { review: ReviewData }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className={style.reviewItem}>
      <div className={style.reviewHeader}>
        <div className={style.authorInfo}>
          <h4 className={style.authorName}>{review.author}</h4>
          <span className={style.reviewDate}>{formatDate(review.createdAt)}</span>
        </div>
        <button className={style.deleteButton} title="삭제">×</button>
      </div>
      <p className={style.reviewContent}>{review.content}</p>
    </div>
  );
}
