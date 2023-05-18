import React, { useState, useReducer, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import Numbtn07 from "../components/Numbtn.0.7.js";
import initialState07 from "../initialState/calculator.0.7.js";
import { useAnimate } from "../hooks/useAnimate.0.5.js";
import { useKeyDown } from "../hooks/useKeyDown.0.6.js";

/*  2023-05-17 09:22:54
    이번 버전에서는, Key 입력을 받아들이고,
    괄호와 소숫점 연산기능을 추가해보자.
    2023-05-17 11:51:41
    Key 입력 처리를 완료하였다.
    또하나의 활용도 높은 useKeyDown 커스텀 훅을 얻었다.

    2023-05-18 04:30:05
    키보드 입력 핸들링은 완성했고,
    이제 괄호 연산 로직을 구현해보자.
    이 문제는 아무래도 버전을 올려서, useReducer 로 시도해야겠다.
    다중 괄호를 허용하므로, 열린 괄호, 닫힌 괄호의 카운트를 state 로 관리한다.
    일단, 1중 괄호에서 로직을 구현해낸 후, 다중 괄호로 확장해보자.

    1. 열린 괄호가 존재할 경우...
       - closeParentheses-openParentheses > 0 ? parenthesOpen = true
       - parenthesOpen 이면, 계산 대상 숫자를 parenthesesToCalculate 에 보관한다.
       - parenthesOpen 이면, 이후 수식계산 결과를 parenthesesResult 에 보관한다.

*/
function parenthesesClosed() {}

const CalculatorV06 = () => {
  const numbers = ["(", ")", "", 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, ".", "="];
  const operators = ["+", "-", "*", "/", "clear"];
  const [state, setState] = useState(initialState07);
  const animateResult = useAnimate(state.resultState, 1000);
  const { parenthesesOpen, parenthesesClosed } = state;
  console.log("state", state);

  //  2023-05-17 10:02:00
  //  키보드 입력을 핸들링하는 펑션이다.
  //  숫자키와 사칙연산 등 numbers, operators 에 있는 키에만 반응한다.
  //  반응 대상 제외 키가 입력되었을 때, 렌더링이 발생하면 안된다.
  //  이 문제를 확실하게 하고 GPT 에게 물어보고 확인받자.  ..
  const handleKeyDown = (e) => {
    // console.log("e.key", e.key);
    if (
      numbers.includes(e.key) ||
      numbers.includes(Number(e.key)) ||
      e.key === "Enter"
    ) {
      numClick(e);
    } else if (operators.includes(e.key) || e.key === "Escape") {
      operatorClick(e);
    } else {
      return;
    }
  };

  const numClick = (e) => {
    let eventNumber = e.target?.value || e.key;
    setState((prevState) => {
      const {
        input,
        operator,
        numberToCalculate,
        wholeArithmetic,
        resultState,
      } = prevState;
      //  "=" 클릭 과 엔터키는 예외처리
      if (eventNumber === "=" || eventNumber === "Enter") {
        e.key === "Enter" ? (eventNumber = "=") : (eventNumber = eventNumber);
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
    const eventOperator = e.target?.value || e.key;
    setState((prevState) => {
      const { numberToCalculate, operator, wholeArithmetic, resultState } =
        prevState;
      //  clear 클릭과 Esc 예외처리..
      if (eventOperator === "clear" || eventOperator === "Escape") {
        return initialState07;
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

  //  parentheses 가 오픈 상태인지를 확인하고, 오픈 상태라면 클로즈 될 때까지,
  //  입력되는 모든 숫자와 수식은 parentheses state 에서 관리된다.
  if (parenthesesClosed) {
    //  2023-05-18 18:30:12
    //  해야할 일은 numClick() 과 같은데, 그 결과를 저장해야 할 state 는 parenthesesToCalculate 이다.
    //  이 문제를 해결해야 이번 과제가 해결된다.
  }

  //  keyDown 핸들링 커스텀 훅
  useKeyDown(handleKeyDown);

  return (
    <div className="Calculator aparatFrame">
      <h1>Calculator 0.7</h1>
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
              <Numbtn07
                key={uniqueId}
                onClick={numClick}
                parenthesesUnclosed={state.parenthesesUnclosed}
              >
                {number}
              </Numbtn07>
            );
          })}
        </div>
        <div className="operatorPad">
          {operators.map((operator) => {
            const uniqueId = uuidv4();
            return (
              <Numbtn07 key={uniqueId} onClick={operatorClick}>
                {operator}
              </Numbtn07>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalculatorV06;

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
