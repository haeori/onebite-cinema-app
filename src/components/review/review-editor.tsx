'use client';

import { useActionState } from 'react';
import { createReviewAction } from '@/actions/create-review-action';
import style from '@/styles/review-editor.module.css';

export default function ReviewEditor({ movieId }: { movieId: string }) {
  const [state, formAction, isPending] = useActionState(createReviewAction, { status: false, error: '' });

  return (
    <section className={style.editorSection}>
      <h3 className={style.sectionTitle}>리뷰 작성</h3>
      <form action={formAction} className={style.editorForm}>
        <input type="text" name="author" placeholder="작성자를 입력하세요" className={style.input} required />
        <textarea name="content" placeholder="리뷰 내용을 입력하세요" className={style.textarea} rows={5} required />
        <input type="hidden" name="movieId" value={movieId} required />
        {state.error && <p className={style.error}>{state.error}</p>}
        <button type="submit" disabled={isPending} className={style.submitButton}>
          {isPending ? '작성중...' : '작성하기'}
        </button>
      </form>
    </section>
  );
}
