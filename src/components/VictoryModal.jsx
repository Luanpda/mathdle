import React from 'react';

export default function VictoryModal({ isOpen, onClose }) {
  
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Parabens! 🎉</h2>
        <p>Você desvendou a equação matemática de hoje!</p>
        
        <button className="close-modal-btn" onClick={onClose}>
          Ver Tabuleiro
        </button>
      </div>
    </div>
  );
}