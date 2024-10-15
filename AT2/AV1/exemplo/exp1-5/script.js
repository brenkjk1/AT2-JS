/*
Crie um algoritmo que leia 20 números inteiros e armazene-os num vetor. 
Armazene os números pares no vetor PAR e os números IMPARES no vetor impar. 
Deve-se no final mostrar os três vetores.
*/
function lerNumeros() {
    let numeros = [];
    for (let i = 0; i < 20; i++) {
        let numero = prompt(`Informe o ${i + 1}º Número:`);
        if (isNaN(numero) || numero.trim() == '') {
            alert("Numero Inválido!");
            numero = prompt(`Informe o ${i + 1}º Número novamente:`);
        }
        numero = parseFloat(numero);
        numeros.push(numero);
    }
    return numeros;
}

let listaGeral = lerNumeros();
let listaPares = listaGeral.filter(num => (num % 2 === 0));
let listaImpares = listaGeral.filter(num => (num % 2 !== 0));

let msg = `A lista de numeros gerais é ${listaGeral.join(', ')} \n
A lista de numeros pares é ${listaPares.join(', ')} \n 
A lista de numeros ímpares é ${listaImpares.join(', ')} \n`
alert(msg);
