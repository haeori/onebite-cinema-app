'use client';

import { useEffect } from 'react';
import style from '@/styles/modal.module.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  icon: string;
};

export default function ConfirmModal({ isOpen, onClose, message, icon }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.modal} onClick={e => e.stopPropagation()}>
        <div className={style.icon}>{icon}</div>
        <p className={style.message}>{message}</p>
        <button className={style.button} onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
}
