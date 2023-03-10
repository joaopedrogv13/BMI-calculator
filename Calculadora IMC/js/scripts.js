// >>>>>>>>>IMC DATA<<<<<<<<<<<
const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

//>>>>>>>>>>>>>>SELEÇÃO DOS ELEMENTOS<<<<<<<<<<<<<<<
const imcTable = document.querySelector("#imc-table"); //tabela de imc

const heightInput = document.querySelector("#height"); //altura
const weightInput = document.querySelector("#weight"); //peso
const calcBtn = document.querySelector("#calc-btn"); //botao para calcular
const clearBtn = document.querySelector("#clear-btn"); //botão para limpar

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");

const backBtn = document.querySelector("#back-btn");

//para alterar o hide
const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

//>>>>>>>>>>>>>FUNÇÕES<<<<<<<<<<<<<<<<<<<

//criação da tabela
function createTable(data) {
  //percorre todos os itens de data
  data.forEach((item) => {
    //cria div com class = table-data
    const div = document.createElement("div");
    div.classList.add("table-data");

    //criação dos três paragrados de classificação
    const classification = document.createElement("p");
    classification.innerText = item.classification;
    const info = document.createElement("p");
    info.innerText = item.info;
    const obesity = document.createElement("p");
    obesity.innerText = item.obesity;

    // ligando os parágrafos a div table
    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    //colocando a div na tabela imc
    imcTable.appendChild(div);
  });
}

//limpa os imputs
function cleanInputs() {
  heightInput.value = "";
  weightInput.value = "";
  imcNumber.classList = "";
  imcInfo.classList = "";
}

//valida apenas número e vírgula
function validDigit(text) {
  return text.replace(/[^0-9,]/g, ""); //substitui tudo que não for número e , para vazio
}

function calcImc(weight, height) {
  const imc = (weight / (height * height)).toFixed(1); //formata 1 casa decimal apenas
  return imc;
}

//alteração se mostrará a calculadora ou o resultado
function showOrHideResults() {
  calcContainer.classList.toggle("hide");
  resultContainer.classList.toggle("hide");
}

//INICIALIZAÇÃO
createTable(data);

//>>>>>>>>>>>>>>>>>EVENTOS<<<<<<<<<<<<<<<<<<<<<<

//permite só numeros e vírgulas
[heightInput, weightInput].forEach((el) => {
  //percorre todo weight e height
  el.addEventListener("input", (e) => {
    //para cada ação de input
    const updateValue = validDigit(e.target.value); //manda o valor atual do input para a função de validação
    e.target.value = updateValue; //atualiza para casos de valores nulos
  });
});

//limpa altura e peso
clearBtn.addEventListener("click", (e) => {
  e.preventDefault();

  cleanInputs();
});

//botão de cálculo
calcBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //troca os valores dos imputs de string para valor e troca , por .
  const weight = +weightInput.value.replace(",", ".");
  const height = +heightInput.value.replace(",", ".");

  if (!weight || !height) return;

  //calculo do imc
  const imc = calcImc(weight, height);

  let info;

  //compara a imc com as informações da tabela
  data.forEach((item) => {
    if (imc >= item.min && imc <= item.max) {
      info = item.info;
    }
  });

  //valores fora da tabela
  if (!info) return;

  //Alteração do numero e Inforomação do imc
  imcNumber.innerText = imc;
  imcInfo.innerText = info;

  switch (info) {
    case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Normal":
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;
    case "Sobrepeso":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Obesidade":
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;
    case "Obesidade grave":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
  }

  showOrHideResults();
});

//validando o botão voltar
backBtn.addEventListener("click", () => {
  cleanInputs();
  showOrHideResults();
});
