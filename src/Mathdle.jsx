
import React, { useState, useEffect } from 'react';
import './mathdle.css';
import Header from './components/Header';
import Difficulty from './components/Difficulty';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import Actions from './components/Actions';
import { verificarResposta } from './utils/gameLogic';
import VictoryModal from './components/VictoryModal';
import RulesModal from './components/RulesModal';

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

  const [equacoesDoDia, setEquacoesDoDia] = useState([]);

  const [dificuldadeAtual, setDificuldadeAtual] = useState('facil');

  const [diasDeJogo, setdiasDeJogo] = useState(0);
  const [modalAberto, setModalAberto] = useState(false);
  const [regrasAberto, setRegrasAberto] = useState(true);
  const [progressoSalvo, setProgressoSalvo] = useState({
    facil: null,
    medio: null,
    dificil: null
  });

  const [keyboardCores, setKeyboardCores] = useState({
    1: 'cinza', 2: 'cinza', 3: 'cinza', 4: 'cinza', 5: 'cinza',
    6: 'cinza', 7: 'cinza', 8: 'cinza', 9: 'cinza', 0: 'cinza', '+': 'cinza', '-': 'cinza', '*': 'cinza', '/': 'cinza', '=': 'cinza'
  });

  const dataLancamento = new Date('2026-03-15T00:00:00');
  const dataAtual = new Date();
  const diasPassados = Math.floor((dataAtual - dataLancamento) / 86400000);


  const validarJogada = () => {

    const resultado = verificarResposta(valorCaixa, equacaoResposta, setKeyboardCores);
    console.log("Resultado da verificação:", resultado);

    setValorCaixa(Array(equacaoResposta.length).fill(''));
    setCaixaAtiva(0)
    setJogadasPassadas([...jogadasPassadas, { valor: valorCaixa, cores: resultado.posicoesCorretas }]);
    if (resultado.status === 'correta') {
      setJogoFinalizado(true);
      setTimeout(() => setModalAberto(true), 1300);
    }
    setLinhaAtual(linhaAtual + 1);
  };

  const vefiricarArray = (array) => {



    if (array.includes('')) return true;
    const qtdIguais = array.filter(item => item === '=').length;
    if (qtdIguais !== 1) {
      return true;
    }

    const equacao = array.join('');
    if (equacao.startsWith('=') || equacao.endsWith('=')) return true;
    const [primeiraParte, segundaParte] = equacao.split('=');

    const primeiraParteLimpa = primeiraParte.replace(/\b0+(?=\d)/g, '');
    const segundaParteLimpa = segundaParte.replace(/\b0+(?=\d)/g, '');
    try {

      if (eval(primeiraParteLimpa) === eval(segundaParteLimpa)) {
        return false;
      } else {
        return true;
      }
    } catch (erro) {

      return true;
    }


  }


  useEffect(() => {

    fetch('https://servermathdle.onrender.com/equacoes')
      .then(resposta => resposta.json())
      .then(dadosRecebidos => {
        setDadosDoBanco(dadosRecebidos);
        const facil = dadosRecebidos.filter(equacao => equacao.dificuldade === 'facil');
        const medio = dadosRecebidos.filter(equacao => equacao.dificuldade === 'medio');
        const dificil = dadosRecebidos.filter(equacao => equacao.dificuldade === 'dificil');

        const equacaoFacilDoDia = facil[diasPassados % facil.length];
        const equacaoMediaDoDia = medio[diasPassados % medio.length];
        const equacaoDificilDoDia = dificil[diasPassados % dificil.length];


        setdiasDeJogo(diasPassados);
        setEquacoesDoDia([equacaoFacilDoDia, equacaoMediaDoDia, equacaoDificilDoDia]);
        setEquacaoResposta(equacaoFacilDoDia.equacao);
        setValorCaixa(Array(equacaoFacilDoDia.equacao.length).fill(''));


      })
      .catch(erro => console.log("Deu ruim na busca:", erro));


  }, []);

  const trocarDificuldade = (novaDificuldade) => {

    if (novaDificuldade === dificuldadeAtual) return;


    setProgressoSalvo(prev => ({
      ...prev,
      [dificuldadeAtual]: {
        valorCaixa,
        jogadasPassadas,
        linhaAtual,
        caixaAtiva,
        jogoFinalizado,
        keyboardCores
      }
    }));


    setDificuldadeAtual(novaDificuldade);


    const mapaIndex = { "facil": 0, "medio": 1, "dificil": 2 };
    const indexEscolhido = mapaIndex[novaDificuldade];
    const novaEquacao = equacoesDoDia[indexEscolhido]?.equacao;
    if (!novaEquacao) return;

    setEquacaoResposta(novaEquacao);


    const progressoAntigo = progressoSalvo[novaDificuldade];

    if (progressoAntigo) {

      setValorCaixa(progressoAntigo.valorCaixa);
      setJogadasPassadas(progressoAntigo.jogadasPassadas);
      setLinhaAtual(progressoAntigo.linhaAtual);
      setCaixaAtiva(progressoAntigo.caixaAtiva);
      setJogoFinalizado(progressoAntigo.jogoFinalizado);
      setKeyboardCores(progressoAntigo.keyboardCores);
    } else {

      setValorCaixa(Array(novaEquacao.length).fill(''));
      setJogadasPassadas([]);
      setLinhaAtual(0);
      setCaixaAtiva(0);
      setJogoFinalizado(false);
      setKeyboardCores({
        1: 'cinza', 2: 'cinza', 3: 'cinza', 4: 'cinza', 5: 'cinza',
        6: 'cinza', 7: 'cinza', 8: 'cinza', 9: 'cinza', 0: 'cinza', '+': 'cinza', '-': 'cinza', '*': 'cinza', '/': 'cinza', '=': 'cinza'
      });
    }
  }




  return (
    <div className="mathdle-container">
      <Header diasDeJogo={diasDeJogo} />
      <Difficulty trocarDificuldade={trocarDificuldade} dificuldadeAtual={dificuldadeAtual} />
      <Board caixaAtiva={caixaAtiva} setCaixaAtiva={setCaixaAtiva} valorCaixa={valorCaixa}
        equacaoResposta={equacaoResposta} linhaAtual={linhaAtual} jogadasPassadas={jogadasPassadas}
        jogoFinalizado={jogoFinalizado}

      />

      <Keyboard caixaAtiva={caixaAtiva} valorCaixa={valorCaixa} setValorCaixa={setValorCaixa}
        setCaixaAtiva={setCaixaAtiva} validarJogada={validarJogada} equacaoResposta={equacaoResposta}
        linhaAtual={linhaAtual} jogoFinalizado={jogoFinalizado} vefiricarArray={vefiricarArray}
        keyboardCores={keyboardCores} />

      <Actions validarJogada={validarJogada} setValorCaixa={setValorCaixa}
        linhaAtual={linhaAtual} jogoFinalizado={jogoFinalizado} vefiricarArray={vefiricarArray}
        valorCaixa={valorCaixa}  setRegrasAberto={setRegrasAberto}/>
      <VictoryModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      />
      <RulesModal
        isOpen={regrasAberto}
        onClose={() => setRegrasAberto(false)}
      />
    </div>
  );
}
