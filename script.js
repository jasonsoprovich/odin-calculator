let firstNum = ''; // Initialize as empty string
let secondNum = ''; // Initialize as empty string
let operator = ''; // Initialize as empty string
let isFirstNum = true;
let resetDisplay = false;

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
equalsButton.addEventListener('click', calculate);

const decimalButton = document.querySelector('#decimal');

const allClearButton = document.querySelector('#allClear');
allClearButton.addEventListener('click', clear);

function updateButtonStates() {
  operatorButtons.forEach(button => {
    button.disabled = !firstNum;
  });
  equalsButton.disabled = !(firstNum && secondNum && operator);

  const activeNum = !operator ? firstNum : secondNum;
  decimalButton.disabled = activeNum.includes('.');
}

function getNum(e) {
  const currentNum = e.target.textContent;

  if (currentNum === '.') {
    const activeNum = !operator ? firstNum : secondNum;
    if (activeNum.includes('.')) {
      return;
    }
  }

  if (resetDisplay === true) {
    displayOutput.textContent = '';
    resetDisplay = false;
  }

  if (!operator) {
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
      displayOutput.textContent = secondNum;
    } else {
      secondNum += currentNum;
      displayOutput.textContent = secondNum;
    }
    displayOperation.textContent = `${firstNum} ${operator} ${secondNum}`;
  }
  updateButtonStates();
}

function getOperator(e) {
  const nextOperator = e.target.textContent.trim();

  if (firstNum && secondNum && operator) {
    const result = operate(firstNum, secondNum, operator);
    displayOutput.textContent = result;
    firstNum = result.toString(); // Convert result to string
    secondNum = '';
    resetDisplay = true;
  }

  operator = nextOperator;
  displayOperation.textContent = `${firstNum} ${operator}`;
  updateButtonStates();
}

function calculate() {
  if (firstNum && secondNum && operator) {
    const result = operate(firstNum, secondNum, operator);
    displayOperation.textContent = `${firstNum} ${operator} ${secondNum} =`;
    displayOutput.textContent = result;

    firstNum = result.toString(); // Convert result to string
    secondNum = '';
    operator = '';
    isFirstNum = true;
    resetDisplay = true;

    updateButtonStates();
  }
}

function operate(firstNum, secondNum, operator) {
  const a = parseFloat(firstNum);
  const b = parseFloat(secondNum);

  let result;
  switch (operator) {
    case '+':
      result = add(a, b);
      break;
    case '-':
      result = subtract(a, b);
      break;
    case '×':
      result = multiply(a, b);
      break;
    case '÷':
      result = divide(a, b);
      break;
    default:
      return '0';
  }

  if (typeof result === 'number') {
    if (Number.isInteger(result)) {
      return result.toString();
    }
    return Number(result.toFixed(8)).toString();
  }
  return result;
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
  firstNum = '';
  secondNum = '';
  operator = '';
  isFirstNum = true;
  displayOutput.textContent = '0';
  displayOperation.textContent = '';
  updateButtonStates();
}

// DIAGNOSTICS
console.log(add(4, 2));
console.log(subtract(5, 2));
console.log(subtract(1, 3));
console.log(multiply(4, 2));
console.log(divide(10, 2));
console.log(divide(4, 0));