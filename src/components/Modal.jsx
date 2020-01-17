import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, children }) => {
  return isOpen ? (
    <div className="modal__backdrop">
      <div className="modal__content">{children}</div>
    </div>
  ) : null;
};

export default Modal;
