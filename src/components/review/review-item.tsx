'use client';

import { ReviewData } from '@/types/movie-types';
import style from '@/styles/review-item.module.css';
import { useActionState, useEffect, useState } from 'react';
import { deleteReviewAction } from '@/actions/delete-review-action';
import ConfirmModal from '@/components/common/confirm-modal';
import { Loading } from '@/components/common/loading';

export function ReviewItem({ review }: { review: ReviewData }) {
  const [state, formAction, isPending] = useActionState(deleteReviewAction, null);
  const [modalState, setModalState] = useState<{ isOpen: boolean; message: string; icon: string }>({
    isOpen: false,
    message: '',
    icon: '',
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  useEffect(() => {
    if (!isPending && state?.error) {
      setModalState({
        isOpen: true,
        message: state.error,
        icon: '⚠️',
      });
    }
  }, [state, isPending]);

  return (
    <div className={style.reviewItem}>
      {isPending && (
        <div className={style.loadingOverlay}>
          <Loading text="삭제 중..." size="small" />
        </div>
      )}
      <div className={style.reviewHeader}>
        <div className={style.authorInfo}>
          <h4 className={style.authorName}>{review.author}</h4>
          <span className={style.reviewDate}>{formatDate(review.createdAt)}</span>
        </div>
        <form action={formAction}>
          <input type="hidden" name="reviewId" value={review.id} />
          <input type="hidden" name="movieId" value={review.movieId} />
          <button type="submit" disabled={isPending} className={style.deleteButton} title="삭제">
            ×
          </button>
        </form>
      </div>
      <p className={style.reviewContent}>{review.content}</p>
      <ConfirmModal isOpen={modalState.isOpen} onClose={() => setModalState({ ...modalState, isOpen: false })} message={modalState.message} icon={modalState.icon} />
    </div>
  );
}
