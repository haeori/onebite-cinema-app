'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { createReviewAction } from '@/actions/create-review-action';
import Modal from '@/components/common/modal';
import style from '@/styles/review-editor.module.css';

export default function ReviewEditor({ movieId }: { movieId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(createReviewAction, { status: false, error: '' });
  const [modalState, setModalState] = useState<{ isOpen: boolean; message: string; icon: string }>({
    isOpen: false,
    message: '',
    icon: '',
  });

  useEffect(() => {
    if (!isPending && state.status) {
      setModalState({
        isOpen: true,
        message: '리뷰 등록에 성공했습니다.',
        icon: '🎬',
      });
      formRef.current?.reset();
    }
  }, [state, isPending]);

  return (
    <section className={style.editorSection}>
      <h3 className={style.sectionTitle}>리뷰 작성</h3>
      <form ref={formRef} action={formAction} className={style.editorForm}>
        <input type="text" name="author" placeholder="작성자를 입력하세요" className={style.input} required />
        <textarea name="content" placeholder="리뷰 내용을 입력하세요" className={style.textarea} rows={5} required />
        <input type="hidden" name="movieId" value={movieId} required />
        {state.error && <p className={style.error}>{state.error}</p>}
        <button type="submit" disabled={isPending} className={style.submitButton}>
          {isPending ? '작성중...' : '작성하기'}
        </button>
      </form>
      <Modal isOpen={modalState.isOpen} onClose={() => setModalState({ ...modalState, isOpen: false })} message={modalState.message} icon={modalState.icon} />
    </section>
  );
}
