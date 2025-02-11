// Declare variables
let firstNum = '';
let secondNum = '';
let operator = null;
let resetDisplay = false;

// Declare constants
const DIVIDE_BY_ZERO_ERROR = '#DIV/0!';

// Assign DOM elements
const displayOutput = document.querySelector('#output');
const displayOperation = document.querySelector('#operation');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('#equals');
const decimalButton = document.querySelector('#decimal');
const allClearButton = document.querySelector('#allClear');
const plusMinusButton = document.querySelector('#plusMinus');
const percentButton = document.querySelector('#percent');

// Initialize display
updateDisplay();

// Add event listeners
numberButtons.forEach(button => button.addEventListener('click', handleNumberInput));
operatorButtons.forEach(button => button.addEventListener('click', handleOperatorInput));
equalsButton.addEventListener('click', handleEquals);
decimalButton.addEventListener('click', handleDecimalInput);
allClearButton.addEventListener('click', clear);
plusMinusButton.addEventListener('click', handlePlusMinus);
percentButton.addEventListener('click', handlePercent);

// Add keyboard support event listener
document.addEventListener('keydown', (event) => handleKeyPress(event.key));

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
  document.activeElement.blur();
}

function handlePlusMinus(e) {
  if (!operator) {
    if (firstNum.startsWith('-')) {
      firstNum = firstNum.slice(1);
    } else {
      firstNum = '-' + firstNum;
    }
  } else {
    if (secondNum.startsWith('-')) {
      secondNum = secondNum.slice(1);
    } else {
      secondNum = '-' + secondNum;
    }
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
    case '=':
    case 'Enter':
      return handleEquals();    
    case '+': return handleOperatorInput({ target: { textContent: '+' } });
    case '-': return handleOperatorInput({ target: { textContent: '-' } });
    case '*': return handleOperatorInput({ target: { textContent: '×' } });
    case '/': return handleOperatorInput({ target: { textContent: '÷' } });
    case '%': return handlePercent();
    case '0':
    case '1': 
    case '2': 
    case '3': 
    case '4': 
    case '5': 
    case '6':
    case '7': 
    case '8': 
    case '9':
        return handleNumberInput({target: {textContent: key}});
    case 'Escape': return clear();
    default: return null;
  }
}

function handleEquals() {
  if (firstNum && secondNum && operator) {
    let result = operate(Number(firstNum), Number(secondNum), operator);

    if (result === DIVIDE_BY_ZERO_ERROR) {
      displayOutput.textContent = DIVIDE_BY_ZERO_ERROR;
      clear();
    } else if (isNaN(result)) {
      displayOutput.textContent = 'Error';
      clear();
    } else {
      result = Number(result.toFixed(8));
      firstNum = String(result);
      displayOutput.textContent = firstNum;
      operator = null;
      secondNum = '';
      resetDisplay = true;
    }
    updateDisplay();
    updateButtonStates();
    document.activeElement.blur();
  }
}

function handlePercent(e){
  if (!operator) {
    if (firstNum) {
      firstNum = String(Number(firstNum) / 100);
    }
  } else {
    if (secondNum) {
      if (operator === '+' || operator === '-') {
        secondNum = String(Number(firstNum) * (Number(secondNum) / 100));
      } else if (operator === '×' || operator === '÷') {
        secondNum = String(Number(secondNum) / 100);
      }
    }
  }
  updateDisplay();
  updateButtonStates();
  document.activeElement.blur();
}

function operate(a, b, operator) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case '+': return a + b;
    case '-': return a - b;
    case '×': return a * b;
    case '÷': return b === 0 ? DIVIDE_BY_ZERO_ERROR : a / b;
    case '%': return b * (a / 100);
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