
import React, { useState } from 'react';

export default function Board({ caixaAtiva, setCaixaAtiva, valorCaixa, equacaoResposta,respostaVerificada}) {

  

  const handleCaixaClick = (index) => {
    if (index === caixaAtiva) {
      setCaixaAtiva(null);
    }else{
      setCaixaAtiva(index);

    }
  }

  
 if (!equacaoResposta) {
    return <div className="input-row">Carregando tabuleiro...</div>;
  }
let cores = null;;
if(respostaVerificada){
  cores = respostaVerificada.posicoesCorretas;
}

  
  
  return (
    <div className="input-row">
      {equacaoResposta.map((item,index) => (
        <div 
          key={index} 
          className={`input-box ${caixaAtiva === index ? 'focus' : ''} ${cores === null ? 'cinza' : cores[index]}`} 
          onClick={() => handleCaixaClick(index)}
        >
          {valorCaixa[index]} 
        </div>
      ))}
    </div>
  );
}