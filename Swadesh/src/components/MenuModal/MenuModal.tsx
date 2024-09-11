
import React from "react";
import styles from './MenuModal.module.css'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  description: string;
  primaryImage: string;
  money: number
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content,description, primaryImage,money }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <img src={primaryImage} width={200} alt=""/>
        <h4>₹ {money}</h4>
        <div>{content}</div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
