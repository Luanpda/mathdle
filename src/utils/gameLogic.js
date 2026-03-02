

export const verificarResposta = (respostaUsuario, respostaCorreta) => {
    const respostas = {
            status: 'incorreta',
            posicoesCorretas: Array(respostaCorreta.length).fill('cinza')
        }
    const respostaCopy = [...respostaCorreta];

    if(respostaUsuario.join() === respostaCorreta.join()){
        respostas.status = 'correta';
        respostas.posicoesCorretas = Array(respostaCorreta.length).fill('verde');
        return respostas
         
        
    }else {
        
        for(let i = 0; i < respostaUsuario.length; i++){
            if(respostaUsuario[i] === respostaCorreta[i]){
                respostas.posicoesCorretas[i] = 'verde';
                respostaCopy[i] = null;
            }
            
            else{
                respostas.posicoesCorretas[i] = 'cinza';
            }
        }
        for(let i = 0; i < respostaUsuario.length; i++){

            if( respostas.posicoesCorretas[i] !== 'verde' && respostaUsuario[i] !== respostaCopy[i] && respostaCopy.includes(respostaUsuario[i])){
                 respostas.posicoesCorretas[i] = 'amarelo';
                 const index = respostaCopy.indexOf(respostaUsuario[i]);
                 respostaCopy[index] = null;
             }

           
        }


        return respostas;
    }

    




}