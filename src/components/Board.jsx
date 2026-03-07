
import React, { useState } from 'react';

export default function Board({ caixaAtiva, setCaixaAtiva, valorCaixa, equacaoResposta, linhaAtual, jogadasPassadas, jogoFinalizado }) {



  const handleCaixaClick = (index) => {
    if (index === caixaAtiva) {
      setCaixaAtiva(null);
    } else {
      setCaixaAtiva(index);

    }
  }


  if (!equacaoResposta) {
    return <div className="input-row">Carregando tabuleiro...</div>;
  }


  let totalDeLinhas = null;


  if(jogoFinalizado){
    totalDeLinhas = Array(jogadasPassadas.length).fill(0);
  }
  else if (linhaAtual + 1 <= 6) {
    totalDeLinhas = Array(linhaAtual + 1).fill(0);
  } else {
    totalDeLinhas = Array(6).fill(0);
  }




  return (
    <div className="board-container">
      {

        totalDeLinhas.map((linha, linhaIndex) => (

          <div key={linhaIndex} className="input-row">

            {equacaoResposta.map((item, index) => (

              <div
                key={index}
                className={`input-box ${linhaIndex === linhaAtual ? caixaAtiva === index ? 'focus' : '' : ''} ${jogadasPassadas[linhaIndex] ? jogadasPassadas[linhaIndex].cores[index] : ''}`}
                onClick={linhaIndex === linhaAtual ? () => handleCaixaClick(index) : null}
              >
                {linhaIndex === linhaAtual ? valorCaixa[index] : jogadasPassadas[linhaIndex].valor[index]}
              </div>


            ))}
          </div>
        ))}
    </div>



  );
}