import React from "react";
import initialState04 from "../initialState/calculator.0.4.js";

/*
const initialState04 = {
  input: 0,
  operator: "+",
  wholeArithmetic: "",
  numberToCalculate: 0,
  resultState: 0,
};
*/
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

export default function reducer04(state, action) {
  console.log("action.payload: ", action.payload);
  switch (action.type) {
    case "ADD_NUMBER":
      //  "=" 클릭 대응
      if (action.payload === "=") {
        const calcResult = calculateResult(
          state.operator,
          state.resultState,
          Number(state.numberToCalculate)
        );
        return {
          ...state,
          input: action.payload,
          operator: "+",
          wholeArithmetic: state.wholeArithmetic + action.payload,
          resultState: calcResult,
        };
      }
      //  직전 입력이 숫자이고 0이 아니면, 현재 입력을 state.input 뒤에 붙여준다.
      let inputToAdd = "";
      !isNaN(Number(state.input)) && Number(state.input) !== 0
        ? (inputToAdd = state.input + action.payload)
        : (inputToAdd = action.payload);
      // console.log("newInput: ", inputToAdd);
      return {
        ...state,
        input: inputToAdd,
        numberToCalculate: inputToAdd,
        wholeArithmetic: state.wholeArithmetic + action.payload,
      };

    case "CALC_SYMBOL":
      //  clear 요청 대응..
      if (action.payload === "clear") {
        return initialState04;
      }
      const calcResult = calculateResult(
        state.operator,
        state.resultState,
        Number(state.numberToCalculate)
      );
      return {
        ...state,
        input: action.payload,
        operator: action.payload,
        wholeArithmetic: state.wholeArithmetic + action.payload,
        resultState: calcResult,
      };
    default:
      return state;
  }
}
