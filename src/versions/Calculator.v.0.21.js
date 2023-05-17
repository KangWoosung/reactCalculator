import React, { useState } from "react";

function CalculatorV021() {
  const [state, setState] = React.useState({
    input: "0",
    operator: null,
    previousValue: null,
  });

  function handleNumberClick(number) {
    setState((prevState) => {
      const { input } = prevState;
      if (input === "0") {
        return { input: String(number) };
      } else {
        return { input: input + String(number) };
      }
    });
  }

  function handleOperatorClick(operator) {
    setState((prevState) => {
      const { input, operator: prevOperator, previousValue } = prevState;
      const inputValue = parseFloat(input);
      if (previousValue === null) {
        return {
          input: "0",
          operator,
          previousValue: inputValue,
        };
      } else {
        const newValue = calculate(prevOperator, previousValue, inputValue);
        return {
          input: String(newValue),
          operator,
          previousValue: newValue,
        };
      }
    });
  }

  function handleDecimalClick() {
    setState((prevState) => {
      const { input } = prevState;
      if (!input.includes(".")) {
        return { input: input + "." };
      } else {
        return prevState;
      }
    });
  }

  function handleClearClick() {
    setState({
      input: "0",
      operator: null,
      previousValue: null,
    });
  }

  function handleEqualClick() {
    setState((prevState) => {
      const { input, operator, previousValue } = prevState;
      const inputValue = parseFloat(input);
      if (operator === null || previousValue === null) {
        return prevState;
      } else {
        const newValue = calculate(operator, previousValue, inputValue);
        return {
          input: String(newValue),
          operator: null,
          previousValue: null,
        };
      }
    });
  }

  function calculate(operator, previousValue, currentValue) {
    switch (operator) {
      case "+":
        return previousValue + currentValue;
      case "-":
        return previousValue - currentValue;
      case "*":
        return previousValue * currentValue;
      case "/":
        return previousValue / currentValue;
      default:
        return currentValue;
    }
  }

  return (
    <div className="calculator">
      <div className="display">{state.input}</div>
      <div className="buttons">
        <button onClick={() => handleClearClick()}>C</button>
        <button onClick={() => handleOperatorClick("/")}>/</button>
        <button onClick={() => handleOperatorClick("*")}>*</button>
        <button onClick={() => handleNumberClick(7)}>7</button>
        <button onClick={() => handleNumberClick(8)}>8</button>
        <button onClick={() => handleNumberClick(9)}>9</button>
        <button onClick={() => handleOperatorClick("-")}>-</button>
        <button onClick={() => handleNumberClick(4)}>4</button>
        <button onClick={() => handleNumberClick(5)}>5</button>
        <button onClick={() => handleNumberClick(6)}>6</button>
        <button onClick={() => handleOperatorClick("+")}>+</button>
        <button onClick={() => handleNumberClick(1)}>1</button>
        <button onClick={() => handleNumberClick(2)}>2</button>
        <button onClick={() => handleNumberClick(3)}>3</button>
        <button onClick={() => handleEqualClick()}>=</button>
        <button onClick={() => handleNumberClick(0)}>0</button>
        <button onClick={() => handleDecimalClick()}>.</button>
      </div>
    </div>
  );
}

export default CalculatorV021;
