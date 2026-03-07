import React from 'react';




export default function Actions({ validarJogada, setValorCaixa , linhaAtual, jogoFinalizado,vefiricarArray,valorCaixa}) {
  return (
    <div className="action-row">
      <button className="action-btn btn-submit" onClick={linhaAtual <= 5  && !jogoFinalizado && !vefiricarArray(valorCaixa)? () => validarJogada()  :  null}>Submit</button>
      <button className="action-btn btn-clear" onClick={() => setValorCaixa([])  }>Clear</button>
      <button className="action-btn btn-rules">Rules</button>
    </div>
  );
}