import React from 'react';
import { useEffect } from 'react';
export default function Keyboard({ caixaAtiva,valorCaixa,setValorCaixa,setCaixaAtiva, validarJogada, equacaoResposta,keyboardCores, linhaAtual, jogoFinalizado, vefiricarArray}) {
  const keypadButtons = [
    '1', '2', '3', '4', '5',
    '0', '6', '7', '8', '9',
    '+', '-', '*', '/', '='
  ];

  


  const handleKeyPress = (teclaClicada) => {
    if(jogoFinalizado){
      return;
    }

    if (teclaClicada === 'Backspace') {
      if (caixaAtiva !== null) {
        const copia = [...valorCaixa];
        
        
        if (copia[caixaAtiva] !== '') {
          copia[caixaAtiva] = '';
          setValorCaixa(copia);
        } 
       
        else if (caixaAtiva > 0) {
          copia[caixaAtiva - 1] = '';
          setValorCaixa(copia);
          setCaixaAtiva(caixaAtiva - 1);
        }
      }
      return;
    }

    if (teclaClicada === 'ArrowRight') {
     
      const ultimaPosicao = equacaoResposta.length - 1; 
      if (caixaAtiva !== null && caixaAtiva < ultimaPosicao) {
        setCaixaAtiva(caixaAtiva + 1);
      }
      return;
    }

    if (teclaClicada === 'ArrowLeft') {
      if (caixaAtiva !== null && caixaAtiva > 0) {
        setCaixaAtiva(caixaAtiva - 1);
      }
      return;
    }

    if(teclaClicada === 'Enter' && linhaAtual <= 5 ){
      if(vefiricarArray(valorCaixa)){
        alert("Erro ao prencher a equação!");
        return;
      }else{
        validarJogada();
        return;
      }
      
    
      
      
      
    }

    if (caixaAtiva !== null) {
      
      const copia = [...valorCaixa];
      copia[caixaAtiva] = teclaClicada
      setValorCaixa(copia);
      const lenEquacao = equacaoResposta.length;
      const valorProxCaixa  = caixaAtiva + 1 < lenEquacao ? caixaAtiva + 1 : caixaAtiva;
      setCaixaAtiva(valorProxCaixa);
      
    } 
  };

  


 
  useEffect(() => {
    const escutarTeclado = (evento) => {

      const tecla = evento.key;
      if(tecla === 'Enter'){
        evento.preventDefault();
        handleKeyPress(tecla);

      }
      if (tecla === 'Backspace' || tecla === 'ArrowLeft' || tecla === 'ArrowRight') {
        evento.preventDefault(); 
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
          <button key={index} className={`key-btn  ${keyboardCores[btn]}`}  onClick={() => handleKeyPress(btn)}>
            {btn}
          </button>
        ))}
      </div>
    </>
  );
}