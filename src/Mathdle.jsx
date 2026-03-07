
import React, { useState, useEffect } from 'react';
import './mathdle.css';
import Header from './components/Header';
import Difficulty from './components/Difficulty';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import Actions from './components/Actions';
import { verificarResposta } from './utils/gameLogic';

export default function Mathdle() {

  //Controla qual caixa esta sendo selecionada no momento
  const [caixaAtiva, setCaixaAtiva] = useState(0);

  //esse e o valor que aparece dentro da caixa selecionada, um array que tem todas as posicoes e valores das caixas
  const [valorCaixa, setValorCaixa] = useState([]);

  //dados recebidos do banco de dados
  const [dadosDoBanco, setDadosDoBanco] = useState([]);

  //equacao sorteada e resposta do jogo
  const [equacaoResposta, setEquacaoResposta] = useState(null);

  //linha atual do jogo, representando as tentativas
  const [linhaAtual, setLinhaAtual] = useState(0);

  //guarda os valores, cores e em qual tentativa  das jogadas passadas
  const [jogadasPassadas, setJogadasPassadas] = useState([]);

  const [jogoFinalizado, setJogoFinalizado] = useState(false);

  const validarJogada = () => {

    const resultado = verificarResposta(valorCaixa, equacaoResposta);
    console.log("Resultado da verificação:", resultado);

    setValorCaixa(Array(equacaoResposta.length).fill(''));
    setCaixaAtiva(0)
    setJogadasPassadas([...jogadasPassadas, { valor: valorCaixa, cores: resultado.posicoesCorretas }]);
    if (resultado.status === 'correta') {
      setJogoFinalizado(true);
    }
    setLinhaAtual(linhaAtual + 1);
  };

  const vefiricarArray = (array) => {


    if (array.includes('')) return false;
    const qtdIguais = array.filter(item => item === '=').length;
    if(qtdIguais !== 1){
      return false;
    }

    const primeiraParte = array.slice(0, array.indexOf('=')).join('');
    const segundaParte = array.slice(array.indexOf('=') + 1).join('');

    try {
      
      if (eval(primeiraParte) === eval(segundaParte)) {
        return true; 
      } else {
        return false; 
      }
    } catch (erro) {
      
      return false; 
    }


  }



  useEffect(() => {

    fetch('https://servermathdle.onrender.com/equacoes')
      .then(resposta => resposta.json())
      .then(dadosRecebidos => {
        setDadosDoBanco(dadosRecebidos);
        const equacaoSorteada = dadosRecebidos[Math.floor(Math.random() * dadosRecebidos.length)]?.equacao
        console.log(equacaoSorteada);
        setEquacaoResposta(equacaoSorteada);
        setValorCaixa(Array(equacaoSorteada.length).fill(''));
      })
      .catch(erro => console.log("Deu ruim na busca:", erro));


  }, []);





  return (
    <div className="mathdle-container">
      <Header />
      <Difficulty />
      <Board caixaAtiva={caixaAtiva} setCaixaAtiva={setCaixaAtiva} valorCaixa={valorCaixa}
        equacaoResposta={equacaoResposta} linhaAtual={linhaAtual} jogadasPassadas={jogadasPassadas}
        jogoFinalizado={jogoFinalizado}

      />

      <Keyboard caixaAtiva={caixaAtiva} valorCaixa={valorCaixa} setValorCaixa={setValorCaixa}
        setCaixaAtiva={setCaixaAtiva} validarJogada={validarJogada} equacaoResposta={equacaoResposta}
        linhaAtual={linhaAtual} jogoFinalizado={jogoFinalizado} vefiricarArray={vefiricarArray} />

      <Actions validarJogada={validarJogada} setValorCaixa={setValorCaixa}
        linhaAtual={linhaAtual} jogoFinalizado={jogoFinalizado} vefiricarArray={vefiricarArray}
        valorCaixa={valorCaixa} />
    </div>
  );
}
