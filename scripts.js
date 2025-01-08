let num1 = "";
let num2 = "";
let operator = "";
let shouldResetNum1 = false;

function displayUpdate(value) {
  const display = document.querySelector('.calculatorScreen');
  display.textContent = value;
}

window.onload = () => { 
  displayUpdate("0"); 
};

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent; 

    if (!isNaN(buttonValue)) { 
      if (!operator) { 
        num1 += buttonValue;
      } else {
        num2 += buttonValue;
      }
      displayUpdate(num1 + (operator ? operator : '') + num2); 
    } else if (buttonValue === ".") { 
      // Handle decimal point (add logic to prevent multiple decimals)
      if (!operator && !num1.includes(".")) { 
        num1 += buttonValue;
      } else if (operator && !num2.includes(".")) {
        num2 += buttonValue;
      }
      displayUpdate(num1 + (operator ? operator : '') + num2);
    } else if (["+", "-", "*", "/"].includes(buttonValue)) { 
      if (num1 !== "" && num2 !== "") { 
        const result = operate(operator, parseFloat(num1), parseFloat(num2));
        num1 = result.toString(); 
        num2 = ""; 
        operator = buttonValue; 
        displayUpdate(num1 + operator); 
      } else if (num1 !== "") { 
        operator = buttonValue; 
        displayUpdate(num1 + operator); 
      } 
    } else if (buttonValue === "=") {
      if (num2 === "") { 
        displayUpdate(num1); 
      } else {
        const result = operate(operator, parseFloat(num1), parseFloat(num2));
        displayUpdate(result); 
        num1 = result.toString(); 
        num2 = "";
        operator = ""; 
        shouldResetNum1 = true; 
      }
    } else if (buttonValue === "C") {
      num1 = "";
      num2 = "";
      operator = "";
      displayUpdate("0"); 
    } else if (buttonValue === "AC") {
      num1 = "";
      num2 = "";
      operator = "";
      shouldResetNum1 = false; 
      displayUpdate("0"); 
    } else if (buttonValue === "←") {
      if (!operator) {
        num1 = num1.slice(0, -1); 
      } else {
        num2 = num2.slice(0, -1); 
      }
      displayUpdate(num1 + (operator ? operator : '') + num2); 
      if (num1 === "") { 
        displayUpdate("0");
      }
    }
  });
});

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      return "Error";
  }
}