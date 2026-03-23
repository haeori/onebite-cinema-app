'use client';

import React, { useEffect, useRef } from 'react';
import style from '@/styles/confirm-modal.module.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  icon: string;
};

export default function ConfirmModal({ isOpen, onClose, message, icon }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if ((e.target as Element).nodeName === 'DIALOG') {
      onClose();
    }
  };

  return (
    <dialog ref={dialogRef} className={style.modal} onClick={handleBackdropClick}>
      <div className={style.icon}>{icon}</div>
      <p className={style.message}>{message}</p>
      <button className={style.button} onClick={onClose}>
        확인
      </button>
    </dialog>
  );
}
