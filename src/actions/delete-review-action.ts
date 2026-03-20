'use server';

import { revalidateTag } from 'next/cache';

type FormState = {
  status: boolean;
  error: string;
} | null;

export async function deleteReviewAction(_: FormState, formData: FormData) {
  const reviewId = formData.get('reviewId')?.toString();
  const movieId = formData.get('movieId')?.toString();

  if (!reviewId) {
    return {
      status: false,
      error: '삭제할 리뷰가 없습니다',
    };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      return {
        status: false,
        error: '리뷰 삭제에 실패했습니다',
      };
    }

    revalidateTag(`review-${movieId}`);

    return {
      status: true,
      error: '',
    };
  } catch (error) {
    return {
      status: false,
      error: `리뷰 삭제 중 오류가 발생했습니다. 다시 시도해 주세요. ${error}`,
    };
  }
}
