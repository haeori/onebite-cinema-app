'use server';

import { revalidateTag } from 'next/cache';

type FormState = {
  status: boolean;
  error: string;
};

export async function createReviewAction(_: FormState, formData: FormData) {
  const author = formData.get('author');
  const content = formData.get('content');
  const movieId = formData.get('movieId');

  if (!author || !content || !movieId) {
    return {
      status: false,
      error: '리뷰 내용과 작성자를 입력해 주세요',
    };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieId: Number(movieId),
        author,
        content,
      }),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    revalidateTag(`review-${movieId}`);

    return {
      status: true,
      error: '',
    };
  } catch (error) {
    return {
      status: false,
      error: `리뷰 작성 중 오류가 발생했습니다. 다시 시도해 주세요. ${error}`,
    };
  }
}
