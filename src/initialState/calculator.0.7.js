import React from "react";

/*  2023-05-17 09:28:05
    괄호 연산이 도입되므로, initialState 에 변경이 필요하다.
*/

const initialState07 = {
  input: 0,
  operator: "+",
  wholeArithmetic: "",
  numberToCalculate: 0,
  resultState: 0,
  parenthesesOpen: 0,
  parenthesesClose: 0,
  parenthesesUnclosed: false,
  parenthesesArithmetic: "",
  parenthesesToCalculate: 0,
  parenthesesCalcResult: 0,
};

export default initialState07;
