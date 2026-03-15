import React from 'react';

export default function Difficulty({trocarDificuldade, dificuldadeAtual}) {
  
  return (
    <div className="difficulty-row">
      <button className={`diff-btn ${dificuldadeAtual === "facil" ? "active" : ''}`} onClick={() => trocarDificuldade("facil")}>Easy</button>
      <button className={`diff-btn ${dificuldadeAtual === "medio" ? "active" : ''}`} onClick={() => trocarDificuldade("medio")}>Medium</button>
      <button className={`diff-btn ${dificuldadeAtual === "dificil" ? "active" : ''}`} onClick={() => trocarDificuldade("dificil")}>Hard</button>
    </div>
  );
}