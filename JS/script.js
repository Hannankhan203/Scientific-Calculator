  const display = document.querySelector("#display");
  const themeCheckbox = document.querySelector("#theme-checkbox");
  const buttons = document.querySelectorAll(".btn");
  const clearButton = document.querySelector("#clear");
  const deleteButton = document.querySelector("#delete");
  const equalsButton = document.querySelector("#equals");
  const toggleScientific = document.querySelector("#toggle-scientific");
  const scientificButtons = document.querySelector(".scientific-buttons");

  let currentInput = "0";
  let operator = "";
  let previousInput = "";

  const updateDisplay = () => {
    display.textContent = currentInput;
  };

  const resetCalculator = () => {
    currentInput = "0";
    operator = "";
    previousInput = "";
    updateDisplay();
  };

  const deleteChar = () => {
      if (currentInput.length > 1) {
          currentInput = currentInput.slice(0, -1);
      }
      else {
          currentInput = "0";
      }
      updateDisplay();
  };

  const handleButtonClick = (value) => {
    if ("0123456789.".includes(value)) {
      if (currentInput === "0" && value !== ".") {
        currentInput = value;
      } else {
        currentInput += value;
      }
    } else if ("+-*/".includes(value)) {
      if (previousInput === "") {
        previousInput = currentInput;
        operator = value;
        currentInput = "0";
      } else {
        performCalculation();
        operator = value;
      }
    } else if (value === "sin" || value === "cos" || value === "tan") {
      const angle = parseFloat(currentInput) * (Math.PI / 180);
      currentInput = Math[value](angle).toString();
    } else if (value === "^") {
      // Store the base for exponentiation and set operator to '^'
      previousInput = currentInput;
      operator = "^";
      currentInput = "0";
    } else if (value === "sqrt") {
      currentInput = Math.sqrt(parseFloat(currentInput)).toString();
    } else if (value === "log") {
      currentInput = Math.log10(parseFloat(currentInput)).toString();
    } else if (value === "ln") {
      currentInput = Math.log(parseFloat(currentInput)).toString();
    } else if (value === "!") {
      currentInput = factorial(parseInt(currentInput)).toString();
    }
    updateDisplay();
  };

  const performCalculation = () => {
    if (previousInput !== "" && operator !== "") {
      const num1 = parseFloat(previousInput);
      const num2 = parseFloat(currentInput);
      switch (operator) {
        case "+":
          currentInput = (num1 + num2).toString();
          break;
        case "-":
          currentInput = (num1 - num2).toString();
          break;
        case "*":
          currentInput = (num1 * num2).toString();
          break;
        case "/":
          currentInput = num2 !== 0 ? (num1 / num2).toString() : "Error";
          break;
        case "^":
          currentInput = Math.pow(num1, num2).toString();
          break;
      }
      previousInput = "";
      operator = "";
    }
  };

  const factorial = (n) => {
    if (n < 0) return "Error";
    return n <= 1 ? 1 : n * factorial(n - 1);
  };

  buttons.forEach(button => {
    button.addEventListener("click", () => handleButtonClick(button.dataset.value));
  });

  equalsButton.addEventListener("click", performCalculation);
  clearButton.addEventListener("click", resetCalculator);
  deleteButton.addEventListener("click", deleteChar);

  // Theme toggle
  themeCheckbox.addEventListener("change", () => {
    document.body.classList.toggle("dark", themeCheckbox.checked);
    document.body.classList.toggle("light", !themeCheckbox.checked);
  });

  // Toggle scientific calculator buttons
  toggleScientific.addEventListener("click", () => {
    scientificButtons.classList.toggle("hidden");
    toggleScientific.textContent = scientificButtons.classList.contains("hidden")
      ? "Sci"
      : "Bas";
  });
