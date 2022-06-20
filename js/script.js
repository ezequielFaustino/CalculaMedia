//selecionar botoes pelo id
const buttons = document.querySelectorAll(".form-group button");


//selecionar aviso para exibir msg
let aviso = document.querySelector("#aviso");
//selecionar formulario
let formulario = document.querySelector('form');
//selecionar input nota1, nota2, situacao
let inputNota1 = document.querySelector("#nota1");
let inputNota2 = document.querySelector("#nota2");
let inputMedia = document.querySelector("#media");
let inputSituacao = document.querySelector("#situacao");

//Calcular media
const calcularMedia = (n1, n2) => {return (n1 + n2) / 2;}

//Situacao com base na media
const situacaoFinal = (mediaFinal) =>{
    let situacaoFinal = '';
    if(mediaFinal > 6){
        situacaoFinal = 'Aprovado';
    }else if(mediaFinal === 6){
        situacaoFinal = 'Recuperação';
    }else{
        situacaoFinal = 'Reprovado';
    }
    return situacaoFinal;
}

//formatar input Situacao Final
const formatarSituacao = (situacaoFinal) =>{
    //caso aprovado, recuperacao, reprovado...
    //console.log(`Situacao final: ${situacaoFinal}`);

    switch(situacaoFinal){
        case 'Aprovado':
            //remover class reprovado, recuperacao
            inputSituacao.classList.remove('reprovado');
            inputSituacao.classList.remove('recuperacao');
            //add class aprovado
            inputSituacao.classList.add('aprovado');
            console.log('adicionar class aprovado');
            break;
        case 'Recuperação':
            //remover class aprovado, reprovado
            inputSituacao.classList.remove('aprovado');
            inputSituacao.classList.remove('reprovado');
            //add class recuperacao
            inputSituacao.classList.add('recuperacao');
            console.log('adicionar class recuperacao');
            break;
        case 'Reprovado':
            //remover class aprovado, recuperacao
            inputSituacao.classList.remove('aprovado');
            inputSituacao.classList.remove('recuperacao');
            //add class reprovado
            inputSituacao.classList.add('reprovado');
            console.log('adicionar class reprovado');
            break;
        default:
            console.log(`Situação indefinida!!`);
    }
}

//Validar e gerar Flash Message
const validarNumero = (numero) =>{
    let num1 = inputNota1.value;
    let num2 = inputNota2.value;
    //se nota inserida menor q 0 e maior q 10
    if((num1 < 0 || num1 > 10) || (num2 < 0 || num2 > 10)){
        formulario.reset(); //limpar form
        aviso.textContent = 'Digite uma nota entre 0 e 10'; //add texto no paragrafo #aviso
        aviso.classList.add('alerta');
        setTimeout(function(){ //exibir #aviso por 2 segundos
            aviso.textContent = '';
            aviso.classList.remove('alerta');
        }, 2000)
    }
}


//event click
buttons.forEach((btn)=>{
    btn.addEventListener("click", (e) =>{
        const value = e.target.innerText;
        //console.log(value);
        if(value === 'Calcular'){
            e.preventDefault();
            //pegar o valor dos inputs
            let nota1 = parseFloat(inputNota1.value);
            let nota2 = parseFloat(inputNota2.value);
            let media = calcularMedia(nota1, nota2);
            console.log(`N1: ${nota1} | N2: ${nota2} | M: ${media}`);
            //se nao for numero ou media menor q 0
            if(isNaN(media) || media < 0){
                console.log('nao é um numero!!');
                inputSituacao.value = '';
            }else{
                //adicionar media no input
                inputMedia.value = parseFloat(media);
                inputSituacao.value = situacaoFinal(media);
                formatarSituacao(situacaoFinal(media));
            }
        }else if(value === 'Limpar'){
            inputSituacao.classList.remove('aprovado');
            inputSituacao.classList.remove('recuperacao');
            inputSituacao.classList.remove('reprovado');
        }
    })
})
