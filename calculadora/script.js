const inputNum1 = document.getElementById("inputNum1");
const inputNum2 = document.getElementById("inputNum2");
const button = document.getElementById("btnAdicionar");
const resultado = document.getElementById("resul");

button.addEventListener("click", () => {
    const num1 = parseFloat(inputNum1.value.trim());
    const num2 = parseFloat(inputNum2.value.trim());
    const selectValue = document.getElementById("select").value;

    if (inputNum1.value.trim() === "" || inputNum2.value.trim() === "") {
        alert("Digite os dois números");
        return;
    }
    let resultadoOperacao;
    
    if (selectValue === "soma") {
        resultadoOperacao = num1 + num2;

    } else if (selectValue === "divisao") {
        if (num2 === 0) {
            alert("Divisão por zero não é permitida!");
            return;
        }
        resultadoOperacao = num1 / num2;

    } else if (selectValue === "subtrair") {
        resultadoOperacao = num1 - num2;

    } else if (selectValue === "multiplicacao") {
        resultadoOperacao = num1 * num2;
    }

    resultado.textContent = `Resultado: ${resultadoOperacao}`;
});
