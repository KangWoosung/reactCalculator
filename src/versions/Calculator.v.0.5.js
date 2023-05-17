import React, { useState, useReducer, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import Numbtn from "../components/Numbtn.js";
import initialState04 from "../initialState/calculator.0.4.js";
import { useAnimate } from "../hooks/useAnimate.0.5.js";

const CalculatorV05 = () => {
  const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, ".", "="];
  const operators = ["+", "-", "*", "/", "clear"];
  const [state, setState] = useState(initialState04);
  const animateResult = useAnimate(state.resultState, 1000);
  console.log("state", state);

  const numClick = (e) => {
    const eventNumber = e.target.value;
    setState((prevState) => {
      const {
        input,
        operator,
        numberToCalculate,
        wholeArithmetic,
        resultState,
      } = prevState;
      //  "=" 클릭 예외처리
      if (eventNumber === "=") {
        const calcResult = calculateResult(
          operator,
          resultState,
          numberToCalculate
        );
        return {
          ...prevState,
          input: "",
          operator: "+",
          numberToCalculate: 0,
          wholeArithmetic: wholeArithmetic + eventNumber + calcResult,
          resultState: Number(calcResult),
        };
      }
      //  직전 입력이 숫자이고 0이 아니면, 현재 입력을 state.input 뒤에 붙여준다.
      const inputToAdd =
        !isNaN(input) && input !== 0 ? input + "" + eventNumber : eventNumber;
      return {
        ...prevState,
        input: inputToAdd,
        numberToCalculate: Number(inputToAdd),
        wholeArithmetic: wholeArithmetic + eventNumber,
      };
    });
  };
  const operatorClick = (e) => {
    const eventOperator = e.target.value;
    setState((prevState) => {
      const { numberToCalculate, operator, wholeArithmetic, resultState } =
        prevState;
      //  clear 클릭 예외처리..
      if (eventOperator === "clear") {
        return initialState04;
      }
      const calcResult = calculateResult(
        operator,
        resultState,
        numberToCalculate
      );
      return {
        ...prevState,
        input: eventOperator,
        operator: eventOperator,
        wholeArithmetic: wholeArithmetic + eventOperator,
        resultState: Number(calcResult),
      };
    });
  };

  return (
    <div className="Calculator aparatFrame">
      <h1>Calculator 0.5</h1>
      <div className="statesContainer">
        <div className="wholeArithmetic">{state.wholeArithmetic}</div>
        <div className="numberToCalculate">{state.numberToCalculate}</div>
        <div
          className={`resultState ${animateResult ? "updatedAnimated" : ""}`}
        >
          {state.resultState}
        </div>
      </div>
      <div className="wholePadContainer">
        <div className="numPad">
          {numbers.map((number) => {
            const uniqueId = uuidv4();
            return (
              <Numbtn key={uniqueId} onClick={numClick}>
                {number}
              </Numbtn>
            );
          })}
        </div>
        <div className="operatorPad">
          {operators.map((operator) => {
            const uniqueId = uuidv4();
            return (
              <Numbtn key={uniqueId} onClick={operatorClick}>
                {operator}
              </Numbtn>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalculatorV05;

function calculateResult(operator, leftOperand, rightOperand) {
  switch (operator) {
    case "+":
      return leftOperand + rightOperand;
    case "-":
      return leftOperand - rightOperand;
    case "*":
      return leftOperand * rightOperand;
    case "/":
      return leftOperand / rightOperand;
    default:
      return 0;
  }
}
