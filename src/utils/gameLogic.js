

export const verificarResposta = (respostaUsuario, respostaCorreta, setKeyboardCores) => {
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
                setKeyboardCores(prev => ({ ...prev, [respostaUsuario[i]]: 'verde' }));
                respostaCopy[i] = null;
            }
            
            else{
                respostas.posicoesCorretas[i] = 'cinza';
                setKeyboardCores(prev => 
                 {
                    if((prev[respostaUsuario[i]] !== 'verde')  &&  (prev[respostaUsuario[i]] !== 'amarelo')){
                       return { ...prev,[respostaUsuario[i]]: 'preto' }
                    }
                    return prev;
                }
                    );
            }
        }
        for(let i = 0; i < respostaUsuario.length; i++){

            if( respostas.posicoesCorretas[i] !== 'verde' && respostaUsuario[i] !== respostaCopy[i] && respostaCopy.includes(respostaUsuario[i])){
                 respostas.posicoesCorretas[i] = 'amarelo';
                 setKeyboardCores(prev => 
                 {
                    if(prev[respostaUsuario[i]] !== 'verde'){
                       return { ...prev,[respostaUsuario[i]]: 'amarelo' }
                    }
                    return prev;
                }
                    );
                 const index = respostaCopy.indexOf(respostaUsuario[i]);
                 respostaCopy[index] = null;
             }

           
        }


        return respostas;
    }

    




}