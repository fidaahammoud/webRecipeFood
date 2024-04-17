import React from 'react';
import classes from '../css/Modal.module.css';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <button className={classes.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
