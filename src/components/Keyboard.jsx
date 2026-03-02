import React from 'react';
import { useEffect } from 'react';
export default function Keyboard({ caixaAtiva,valorCaixa,setValorCaixa,setCaixaAtiva, validarJogada}) {
  const keypadButtons = [
    '1', '2', '3', '4', '5',
    '0', '6', '7', '8', '9',
    '+', '-', '*', '/', '='
  ];

  const handleKeyPress = (teclaClicada) => {
    if(teclaClicada === 'Enter'){
      validarJogada();
      
      
      return;
    }

    if (caixaAtiva !== null) {
      
      const copia = [...valorCaixa];
      copia[caixaAtiva] = teclaClicada
      setValorCaixa(copia);

      const valorProxCaixa  = caixaAtiva + 1 <=5 ? caixaAtiva + 1 : caixaAtiva;
      setCaixaAtiva(valorProxCaixa);
      
    } else {
      console.log("Nenhuma caixa está selecionada no momento");
    }
  };

 
  
  useEffect(() => {
    const escutarTeclado = (evento) => {

      const tecla = evento.key;
      if(tecla === 'Enter'){
        handleKeyPress(tecla);

      }
     if(keypadButtons.includes(tecla)){
        handleKeyPress(tecla);
      }
    
    };
    
    window.addEventListener('keydown', escutarTeclado);
    return () => {
      window.removeEventListener('keydown', escutarTeclado);
    };
    
  
  }, [caixaAtiva, valorCaixa]);








  return (
    <>
      
      <div className="keypad-grid">
        {keypadButtons.map((btn, index) => (
          <button key={index} className="key-btn" onClick={() => handleKeyPress(btn)}>
            {btn}
          </button>
        ))}
      </div>
    </>
  );
}