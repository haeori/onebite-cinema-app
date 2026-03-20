import { MOVIE_API_URL } from '@/constants/movie-constants';
import { ReviewData } from '@/types/movie-types';
import { ReviewItem } from '@/components/review/review-item';

export default async function ReviewList({ movieId }: { movieId: string }) {
  const res = await fetch(`${MOVIE_API_URL}/review/movie/${encodeURIComponent(movieId)}`, { next: { tags: [`review-${movieId}`] } });

  if (!res.ok) {
    throw new Error(`Error fetching reviews : ${res.statusText}`);
  }

  const reviews: ReviewData[] = await res.json();

  return (
    <section>
      {reviews?.map(review => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </section>
  );
}
