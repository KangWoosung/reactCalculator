import React from "react";

/*  2023-05-15 11:49:44
GPT 에게 프롬을 잘 줘서 리팩토링을 부탁했는데,
받아본 중 제일 잘 나왔다. 바드보다는 역시 GPT 에 가능성이 더 많아 보인다.

고마워. 그런데 나는 코드가 반복되는 부분이 마음에 안들어서 리팩토링을 하고 싶었어.
다시한번 봐주고, 코드의 반복을 최소화하는 방향으로 리팩토링 해주면 고맙겠어.

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

export default function reducerV041(state, action) {
  console.log("action.payload: ", action.payload);
  switch (action.type) {
    case "ADD_NUMBER":
      let inputToAdd = "";
      if (!isNaN(Number(state.input)) && Number(state.input) !== 0) {
        inputToAdd = state.input + action.payload;
      } else {
        inputToAdd = action.payload;
      }
      console.log("newInput: ", inputToAdd);
      return {
        ...state,
        input: inputToAdd,
        wholeArithmetic: state.wholeArithmetic + action.payload,
      };
    case "CALC_SYMBOL":
      console.log("CALC_SYMBOL: ", action.payload);
      const operator = action.operator;
      const leftOperand = state.resultState;
      const rightOperand = Number(state.input);
      const resultState = calculateResult(operator, leftOperand, rightOperand);

      return {
        ...state,
        input: action.payload,
        operator,
        wholeArithmetic: state.wholeArithmetic + action.payload,
        resultState,
      };
    case "CLEAR":
      return {
        ...state,
        input: "",
        operator: "",
        wholeArithmetic: "",
        resultState: "",
      };
    case "EQUAL":
      return {
        ...state,
        input: state.resultState,
        operator: "",
        wholeArithmetic: "",
        resultState: "",
      };
    default:
      return state;
  }
}
