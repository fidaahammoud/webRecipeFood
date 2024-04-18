import React from 'react';
import classes from '../css/Modal.module.css';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <p style={{ color: '#434039', fontWeight: 'bold' }}>Sort By: </p>
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
