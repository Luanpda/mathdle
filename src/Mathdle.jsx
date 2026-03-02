
import React, { useState,useEffect } from 'react';
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

  //guarda a resposta verificada, com informacoes das cores e do status 
  const [respostaVerificada, setRespostaVerificada] = useState(null);

  const validarJogada = () => {
    
    const resultado = verificarResposta(valorCaixa, equacaoResposta);
    console.log("Resultado da verificação:", resultado);
    
    setRespostaVerificada(resultado);
  };





  useEffect(() => {
  
    fetch('http://localhost:3000/equacoes')
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
      <Board caixaAtiva={caixaAtiva} setCaixaAtiva={setCaixaAtiva} valorCaixa={valorCaixa} equacaoResposta={equacaoResposta} respostaVerificada={respostaVerificada} />
      <Keyboard caixaAtiva={caixaAtiva}  valorCaixa={valorCaixa} setValorCaixa={setValorCaixa} setCaixaAtiva={setCaixaAtiva} validarJogada={validarJogada}/>
      <Actions />
    </div>
  );
}
