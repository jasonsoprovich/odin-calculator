let firstNum;
let secondNum;
let operator; 

const displayOutput = document.querySelector('#output');
displayOutput.textContent = '0';

const displayOperation = document.querySelector('#operation');
displayOperation.textContent = 'a + b + c = 10';

const numberButtons = document.querySelectorAll('.number');

function getNumber(e){
  displayOutput.textContent = e.target.textContent;
  if (firstNum === undefined){
    firstNum=e.target.textContent;
  } else {
    secondNum=e.target.textContent;
  }
  console.log(firstNum,'first');
  console.log(secondNum,'second');
  
}


numberButtons.forEach(button => {
  button.addEventListener('click', getNumber);
})


 
function add(a, b) {
  return a + b;
};

console.log(add(5,2));

function subtract(a, b) {
  return a - b;
};

function multiply(a, b) {
  return a * b;
};

function divide(a, b) {
  return a / b;
};


// function clear() {

// }

function operate () {

}