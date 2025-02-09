let firstNum; // before operator
let secondNum; // after operator
let operator; // + - / x
let operation; // operation string
let isFirstNum = true;

const displayOutput = document.querySelector('#output');
const displayOperation = document.querySelector('#operation');
displayOutput.textContent = '0';
displayOperation.textContent = '';

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
  button.addEventListener('click', getNum);
})

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
  button.addEventListener('click', getOperator);
  button.disabled = true;
})

const equalsButton = document.querySelector('#equals');
equalsButton.disabled = true;
equalsButton.addEventListener('click', operate(firstNum, secondNum, operator));

const allClearButton = document.querySelector('#allClear');
allClearButton.addEventListener('click', clear);

function updateButtonStates() {
  operatorButtons.forEach(button => {
    button.disabled = !firstNum;
  });
  equalsButton.disabled = !(firstNum && secondNum && operator);
}

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
  updateButtonStates();
}
 
function getOperator(e) {
  if (firstNum !== undefined) {
    operator = e.target.textContent.trim();
    displayOperation.textContent = `${firstNum} ${operator}`;
    isFirstNum = true;
  }
  updateButtonStates();
}

function operate(firstNum, secondNum, operator){
  const a = parseFloat(firstNum);
  const b = parseFloat(secondNum);

  switch(operator) {
    case '+':
      return add(a, b);      
    case '-':
      return subtract(a, b);
    case '×':
      return multiply(a, b);
    case '÷':
      return divide(a, b);
    default:
      return null;
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
  if (b === 0) {
    return '#DIV/0!';
  } else {
  return a / b;
  }
};

function clear() {
  firstNum = undefined;
  secondNum = undefined;
  operator = undefined;
  isFirstNum = true;
  displayOutput.textContent = '0';
  displayOperation = '';
  updateButtonStates();
}


// DIAGNOSTICS
console.log(add(4,2));
console.log(subtract(5,2));
console.log(subtract(1,3));
console.log(multiply(4,2));
console.log(divide(10,2));
console.log(divide(4,0));