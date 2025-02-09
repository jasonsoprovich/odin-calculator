// State variables
let firstNum = '';
let secondNum = '';
let operator = null;
let resetDisplay = false;

// Constants
const DIVIDE_BY_ZERO_ERROR = '#DIV/0!';

// DOM elements
const displayOutput = document.querySelector('#output');
const displayOperation = document.querySelector('#operation');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('#equals');
const decimalButton = document.querySelector('#decimal');
const allClearButton = document.querySelector('#allClear');

// Initialize display
updateDisplay();

// Event listeners
numberButtons.forEach(button => button.addEventListener('click', handleNumberInput));
operatorButtons.forEach(button => button.addEventListener('click', handleOperatorInput));
equalsButton.addEventListener('click', handleEquals);
decimalButton.addEventListener('click', handleDecimalInput);
allClearButton.addEventListener('click', clear);

// Functions
function updateDisplay() {
  displayOutput.textContent = firstNum || '0';
  displayOperation.textContent = `${firstNum || ''} ${operator || ''} ${secondNum || ''}`.trim();
}

function handleNumberInput(e) {
  const num = e.target.textContent;

  if (resetDisplay) {
    firstNum = '';
    resetDisplay = false;
  }

  if (!operator) {
    firstNum += num;
  } else {
    secondNum += num;
  }

  updateDisplay();
  updateButtonStates();
}

function handleOperatorInput(e) {
  const newOperator = e.target.textContent;

  if (firstNum) {
    if (secondNum) {
      handleEquals();
    }
    operator = newOperator;
    resetDisplay = false;
    updateDisplay();
    updateButtonStates();
  }
}

function handleDecimalInput(e) {
  if (resetDisplay) {
    firstNum = '';
    resetDisplay = false;
  }

  if (!firstNum.includes('.')) {
    firstNum += '.';
    updateDisplay();
    updateButtonStates();
  }
}

function handleEquals() {
  if (firstNum && secondNum && operator) {
    const result = operate(Number(firstNum), Number(secondNum), operator);

    if (result === DIVIDE_BY_ZERO_ERROR) {
      displayOutput.textContent = DIVIDE_BY_ZERO_ERROR;
      clear();
    } else {
      firstNum = String(result);
      displayOutput.textContent = firstNum;
      operator = null;
      secondNum = '';
      resetDisplay = true;
    }

    updateDisplay();
    updateButtonStates();
  }
}

function operate(a, b, operator) {
  switch (operator) {
    case '+': return a + b;
    case '-': return a - b;
    case '×': return a * b;
    case '÷': return b === 0 ? DIVIDE_BY_ZERO_ERROR : a / b;
    default: return NaN;
  }
}

function clear() {
  firstNum = '';
  secondNum = '';
  operator = null;
  resetDisplay = false;
  updateDisplay();
  updateButtonStates();
}

function updateButtonStates() {
  equalsButton.disabled = !(firstNum && secondNum && operator);
  decimalButton.disabled = firstNum.includes('.');
}