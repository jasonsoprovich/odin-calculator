let firstNum;
let secondNum;
let operator; 

const displayOutput = document.querySelector('#output');
displayOutput.textContent = '0';

const displayOperation = document.querySelector('#operation');
displayOperation.textContent = 'a + b = c';

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
  button.addEventListener('click', getNum);
})

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
  button.addEventListener('click', getOperator);
})

const allClearButton = document.querySelector('#allClear');
allClearButton.addEventListener('click', clear);

function getNum(e){
  if (firstNum === undefined){
    firstNum = e.target.textContent;
    displayOutput.textContent = firstNum;
  } else {
    firstNum += e.target.textContent;
    displayOutput.textContent = firstNum;
  }
  console.log(firstNum,'first');
  return firstNum;
}
 
function getOperator(e) {
  displayOutput.textContent = e.target.textContent;
    operator = e.target.textContent.trim();
  console.log(operator, 'operator');
}

function add(a, b) {
  return a + b;
};

function subtract(a, b) {
  return a - b;
};

function multiply(a, b) {
  return a * b;
};

function divide(a, b) {
  return a / b;
};

function clear() {
  firstNum = undefined;
  secondNum = undefined;
  operator = undefined;
  displayOutput.textContent = '0';
  console.log(firstNum,'firstNum');
  console.log(secondNum,'secondNum');
  console.log(operator,'operator');  
}