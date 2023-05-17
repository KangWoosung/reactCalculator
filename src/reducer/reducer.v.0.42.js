import React from "react";

/*  2023-05-15 11:54:40
GPT 와 Bard 에게 같은 프롬으로 리팩토링을 두번씩 반복하고 있는데,
이번에 나온 Bard 의 코드는 GPT 보다 더 좋은 것 같다.

결론은.. 비슷하다. 프롬을 잘 쓰고 반복질문할 수록 좋은 코드가 나온다.
둘 다 쓸만하니, 교차 질문해가면서 더 좋은 걸 쓰면 되겠다.
*/

export default function reducer042(state, action) {
  switch (action.type) {
    case "ADD_NUMBER":
      return {
        ...state,
        input: handleNumber(state.input, action.payload),
        wholeArithmetic: state.wholeArithmetic + action.payload,
      };
    case "CALC_SYMBOL":
      return {
        ...state,
        input: "",
        operator: action.payload,
        wholeArithmetic: state.wholeArithmetic + action.payload,
        resultState: calculate(state.input, action.payload),
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

function handleNumber(input, number) {
  if (isNaN(Number(input)) || input === "") {
    return number;
  } else {
    return input + number;
  }
}

function calculate(input, operator) {
  switch (operator) {
    case "+":
      return Number(input) + Number(operator);
    case "-":
      return Number(input) - Number(operator);
    case "*":
      return Number(input) * Number(operator);
    case "/":
      return Number(input) / Number(operator);
  }
}
