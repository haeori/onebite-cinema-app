import { MOVIE_API_URL } from '@/constants/movie-constants';
import { ReviewData } from '@/types/movie-types';
import { ReviewItem } from '@/components/review/review-item';
import style from '@/styles/review-list.module.css';

export default async function ReviewList({ movieId }: { movieId: string }) {
  const res = await fetch(`${MOVIE_API_URL}/review/movie/${encodeURIComponent(movieId)}`, { next: { tags: [`review-${movieId}`] } });

  if (!res.ok) {
    throw new Error(`Error fetching reviews : ${res.statusText}`);
  }

  const reviews: ReviewData[] = await res.json();

  return (
    <section className={style.reviewSection}>
      <h3 className={style.sectionTitle}>
        리뷰 <span className={style.reviewCount}>({reviews.length})</span>
      </h3>
      {reviews.length > 0 ? (
        <div className={style.reviewList}>
          {reviews.map(review => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className={style.emptyState}>
          <p>아직 작성된 리뷰가 없습니다.</p>
          <p className={style.emptySubtext}>첫 번째 리뷰를 작성해보세요!</p>
        </div>
      )}
    </section>
  );
}
