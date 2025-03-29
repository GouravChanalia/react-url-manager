import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ children, isOpen }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={modalStyle}>
      <div>{children}</div>
    </div>,
    document.getElementById('root')
  );
}

const modalStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default Modal;
