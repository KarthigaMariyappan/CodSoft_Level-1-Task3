let display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = '';

function clearDisplay() {
  currentInput = '';
  previousInput = '';
  operator = '';
  display.textContent = '0';
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  display.textContent = currentInput || '0';
}

function appendNumber(number) {
  if (currentInput === '0') {
    currentInput = number;
  } else {
    currentInput += number;
  }
  display.textContent = currentInput;
}

function appendOperator(op) {
  if (currentInput === '') return;  // Don't allow operator input without a number
  
  if (previousInput !== '') {
    // If we already have previous input and operator, calculate the result before changing the operator
    calculate();
  }

  operator = op;
  previousInput = currentInput;
  currentInput = '';
  // Display the ongoing expression (e.g., 5 +)
  display.textContent = previousInput + ' ' + operator;
}

function calculate() {
  if (previousInput === '' || currentInput === '') return;

  let result;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  switch (operator) {
    case '+':
      result = prev + curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case '*':
      result = prev * curr;
      break;
    case '/':
      if (curr === 0) {
        result = 'Error';
      } else {
        result = prev / curr;
      }
      break;
    default:
      return;
  }

  // Show the full equation on the display (e.g., 5 + 3 = 8)
  display.textContent = previousInput + ' ' + operator + ' ' + currentInput + ' = ' + result;
  
  previousInput = result.toString();  // Update the previousInput with result
  currentInput = '';  // Reset current input after calculation
  operator = '';  // Reset operator after calculation
}
