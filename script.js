let firstNum; // before operator
let secondNum; // after operator
let operator; // + - / x
let operation; // operation string
let isFirstNum = true;

const displayOutput = document.querySelector('#output');
displayOutput.textContent = '0';

const displayOperation = document.querySelector('#operation');
displayOperation.textContent = '';

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
  const currentNum = e.target.textContent;

  if (!operator){
    if (isFirstNum === true) {
      firstNum = currentNum;
      displayOutput.textContent = firstNum;
      isFirstNum = false;
    } else {
      firstNum += currentNum;
      displayOutput.textContent = firstNum;
    }
  } else {
    if (!secondNum) {
      secondNum = currentNum;
      displayOperation.textContent = secondNum;
    } else {
      secondNum += currentNum;
      displayOutput.textContent = secondNum;
    }
    displayOperation.textContent = `${firstNum} ${operator} ${secondNum}`;
  }
}
 
function getOperator(e) {
  if (firstNum === undefined) {

  } else {
    operation = firstNum + '' + e.target.textContent.trim();
    operator = e.target.textContent.trim();
    displayOutput.textContent = operation;
  }
  console.log(operator, 'operator');
  return operator;
}

function operate(firstNum, secondNum, operator){
  let outcome;

  switch(operator){
  case '+':
    return outcome = add(firstNum, secondNum);
    break;
  case '-':
    return outcome = subtract(firstNum, secondNum);
    break;
  }
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