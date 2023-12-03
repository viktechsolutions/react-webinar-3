import React from 'react';

import './style.css';

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="Modal">
            <div className="Modal-content">
                <button className="Modal-close" onClick={onClose}>
                    Закрыть
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;
