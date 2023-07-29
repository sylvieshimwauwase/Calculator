let displayValue = '0';
let firstNumber = '';
let operator = '';
let secondNumber = '';
let isDecimalClicked = false;

function updateDisplay() {
  const display = document.querySelector('.display');
  display.textContent = displayValue;
}

function clearDisplay() {
  displayValue = '0';
  firstNumber = '';
  operator = '';
  secondNumber = '';
  isDecimalClicked = false;
  updateDisplay();
}

function deleteLastCharacter() {
  if (displayValue.length === 1 || displayValue === '-0') {
    displayValue = '0';
  } else {
    displayValue = displayValue.slice(0, -1);
  }
  updateDisplay();
}

function appendNumber(number) {
  if (displayValue === '0' || displayValue === '-0') {
    displayValue = number.toString();
  } else {
    displayValue += number.toString();
  }
  updateDisplay();
}

function appendDecimal() {
  if (!isDecimalClicked) {
    displayValue += '.';
    isDecimalClicked = true;
    updateDisplay();
  }
}

function handleOperator(op) {
  if (firstNumber !== '' && operator !== '' && secondNumber === '') {
    operator = op;
    return;
  }

  if (firstNumber === '' && displayValue !== '0') {
    firstNumber = displayValue;
    operator = op;
    displayValue = '0';
    isDecimalClicked = false;
    updateDisplay();
  } else if (firstNumber !== '' && operator !== '' && displayValue !== '0') {
    secondNumber = displayValue;
    operate();
    operator = op;
    isDecimalClicked = false;
    secondNumber = '';
  }
}

function operate() {
  if (firstNumber === '' || operator === '' || secondNumber === '') {
    return;
  }

  const num1 = parseFloat(firstNumber);
  const num2 = parseFloat(secondNumber);
  let result = 0;

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      if (num2 === 0) {
        displayValue = 'Error: Cannot divide by zero';
        updateDisplay();
        return;
      }
      result = num1 / num2;
      break;
  }

  displayValue = result.toString();
  firstNumber = displayValue;
  operator = '';
  isDecimalClicked = false;
  updateDisplay();
}

// Event listeners
document.querySelector('.clear').addEventListener('click', clearDisplay);
document.querySelector('.delete').addEventListener('click', deleteLastCharacter);

const numberButtons = document.querySelectorAll('.calculator button:not(.clear):not(.delete):not(.operation):not(.equal):not(.decimal)');
numberButtons.forEach(button => {
  button.addEventListener('click', () => appendNumber(button.textContent));
});

document.querySelector('.calculator .decimal').addEventListener('click', appendDecimal);

document.querySelector('.calculator .operation').addEventListener('click', (event) => handleOperator(event.target.textContent));
document.querySelector('.calculator .equal').addEventListener('click', operate);
