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

// Keyboard Support
document.addEventListener('keyup', (event) => handleKeyPress(event.key));

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
  
  document.activeElement.blur();
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

function handleKeyPress(key) {


  switch (key) {
    case 'Backspace': 
      if (!operator) {
        if (firstNum) {
          firstNum = firstNum.slice(0, -1);
          updateDisplay();
          updateDisplay();
        }
      } else {
        if (secondNum) {
        secondNum = secondNum.slice(0, -1);
        updateDisplay();
        updateDisplay();
        }
      }
      return console.log('delete');
    case '=':
    case 'Enter':
      return handleEquals();    
    case '+': return console.log('plus'); //return a + b;
    case '-': return console.log('subtract'); //return a - b;
    case '*': return console.log('multiply'); //return a * b;
    case '/': return console.log('divide'); //return b === 0 ? DIVIDE_BY_ZERO_ERROR : a / b;
    case '1': return console.log('1');
    case '2': return console.log('2');
    case '3': return console.log('3');
    case '4': return console.log('4');
    case '5': return console.log('5');
    case '6': return console.log('6');
    case '7': return console.log('7');
    case '8': return console.log('8');
    case '9': return console.log('9');
    case '0': return console.log('0');
    case 'Escape': return clear();
    default: return null;
  }
}

function handleEquals() {
  if (firstNum && secondNum && operator) {
    const result = operate(Number(firstNum), Number(secondNum), operator);

    if (result === DIVIDE_BY_ZERO_ERROR) {
      displayOutput.textContent = DIVIDE_BY_ZERO_ERROR;
      clear();
    } else if (isNaN(result)) {
      displayOutput.textContent = 'Error';
      clear();
    } else {
      firstNum = String(result);
      displayOutput.textContent = firstNum;
      operator = null;
      secondNum = '';
      resetDisplay = true;
    }
    document.activeElement.blur();
    updateDisplay();
    updateButtonStates();
  }
}

function operate(a, b, operator) {
  a = Number(a);
  b = Number(b);
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