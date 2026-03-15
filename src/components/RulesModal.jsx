import React from 'react';

export default function RulesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content rules-content" onClick={(e) => e.stopPropagation()}>
        <h2>Como Jogar 🧮</h2>
        <p>Descubra a <strong>equação matemática</strong> oculta em 6 tentativas.</p>
        
        <ul className="rules-list">
          <li>Cada tentativa deve ser uma equação matemática válida (ex: 10+20=30).</li>
          <li>Você deve usar exatamente um sinal de igual (=).</li>
          <li>A conta deve estar matematicamente correta.</li>
          <li>Você tem 6 tentativas para poder acertar.</li>
          <li>O servidor demora de 30-40 segundos  para iniciar.</li>
        </ul>

        <div className="rules-examples">
          <p><strong>Exemplos:</strong></p>
          
          <div className="example-row">
            <div className="board-box verde">5</div>
            <div className="board-box cinza">+</div>
            <div className="board-box cinza">5</div>
            <div className="board-box cinza">=</div>
            <div className="board-box cinza">1</div>
            <div className="board-box cinza">0</div>
          </div>
          <p>O número <strong>5</strong> faz parte da equação e está na posição correta.</p>

          <div className="example-row">
            <div className="board-box cinza">1</div>
            <div className="board-box cinza">2</div>
            <div className="board-box amarelo">-</div>
            <div className="board-box cinza">2</div>
            <div className="board-box cinza">=</div>
            <div className="board-box cinza">1</div>
            <div className="board-box cinza">0</div>
          </div>
          <p>O sinal de <strong>-</strong> faz parte da equação, mas em outra posição.</p>

          <div className="example-row">
            <div className="board-box cinza">2</div>
            <div className="board-box cinza">*</div>
            <div className="board-box cinza">4</div>
            <div className="board-box cinza">=</div>
            <div className="board-box cinza">0</div>
            <div className="board-box cinza">8</div>
          </div>
          <p>Nenhum desses números ou símbolos faz parte da equação (ou você já encontrou todos eles).</p>
        </div>
        
        <button className="close-modal-btn" onClick={onClose}>
          Jogar!
        </button>
      </div>
    </div>
  );
}