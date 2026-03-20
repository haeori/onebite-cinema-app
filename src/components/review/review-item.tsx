import { ReviewData } from '@/types/movie-types';

export function ReviewItem({ review }: { review: ReviewData }) {
  return (
    <>
      <div key={review.id}>
        <h3>{review.author}</h3>
        <p>{review.content}</p>
        <button>삭제하기</button>
      </div>
    </>
  );
}
