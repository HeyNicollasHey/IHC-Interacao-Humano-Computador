//CALCULADORA

var num1 = 3
var num2 = 5

function soma(num1, num2){
    num3 = num1 + num2
    return console.log(num3)
}

function subtracao(num1, num2){
    num3 = num1 - num2
    return console.log(num3)
}

function multiplicacao(num1, num2){
    num3 = num1 * num2
    return console.log(num3)
}

function divisao(num1, num2){
    if(num1 == 0)
        num3 == 1
    else if(num2 == 0){
        num3 == "Nao é possivel dividor por 0"
    } else(num3 = num1 / num2)
    console.log(num3)
}

function numeroPar(num1){
    var total = num1/2;

    if(num1 & 1){
        console.log("Impar");
    } else {
        console.log("Par");
    }
}

function somaDeIntervalo(num1, num2){
    let soma = 0
    for(let n = num1; n <= num2; n++)
       soma += n
    return soma
}

function fatorial(num1) {
    if (num1 === 0 || num1 === 1) {
        return 1;
    } else {
        return num1 * fatorial(num1 - 1);
    }
}

function contarVogais(palavra) {
    let vogais = 'aeiouAEIOU';
    let contador = 0;

    for (let i = 0; i < palavra.length; i++) {
        if (vogais.includes(palavra[i])) {
            contador++;
        }
    }

    return contador;
}

//console.log(numeroPar(num1))
//console.log(somaDeIntervalo(num1,num2))
//console.log(fatorial(num2))
//console.log(fatorial(num1))
console.log(contarVogais("feijao"))

