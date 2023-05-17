import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Numbtn from "../components/Numbtn.js";

/*  2023-05-15 01:25:08
필요한 state
- 현재까지의 연산 결과 값       - resultState
- 현재까지의 전체 연산 String   - wholeArithmetic
- 직전 연산자                   - prevOperator
- 이벤트 연산자                 - eventOperator
- 직전 숫자 값                  - prevNumber
- 이벤트 숫자 값                - eventNumber
- 이벤트 클릭의 종류             - eventClickType (number, operator)
- 직전 이벤트 클릭의 종류         - prevClickType (number, operator)
- 처리될 숫자 state             - numberToCalculate

문제점들..
직전 이벤트가 숫자이고, 현재 이벤트가 숫자일 때, 숫자를 붙여줘야 한다.
numClick 펑션에서 외부함수에 이 처리를 위임하자.

*/
//  직전 숫자에 추가 숫자를 붙여준다.
function addNumberToTail(prevNumber, eventNumber) {
  //   return prevNumber * 10 + Number(eventNumber);
  return String(prevNumber) + String(eventNumber);
}
//  전체 연산 String에 숫자/기호를 붙여준다.
function addNumberToWholeArithmetic(wholeArithmetic, eventNumber) {
  return wholeArithmetic + eventNumber;
}
function calculateNumbers(resultState, prevOperator, numberToCalculate) {
  let newResultState = 0;
  switch (prevOperator) {
    case "+":
      newResultState = Number(resultState) + numberToCalculate;
      break;
    case "-":
      newResultState = Number(resultState) - numberToCalculate;
      break;
    case "*":
      newResultState = Number(resultState) * numberToCalculate;
      break;
    case "/":
      newResultState = Number(resultState) / numberToCalculate;
      break;
    case "clear":
      newResultState = 0;
    default:
      newResultState = numberToCalculate;
      break;
  }
  return newResultState;
}

const CalculatorV02 = () => {
  const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, ".", "="];
  const operators = ["+", "-", "*", "/", "clear"];

  const [resultState, setResultState] = useState(0);
  const [wholeArithmetic, setWholeArithmetic] = useState("");
  const [prevOperator, setPrevOperator] = useState("+");
  const [eventOperator, setEventOperator] = useState("");
  const [prevNumber, setPrevNumber] = useState(0);
  const [eventNumber, setEventNumber] = useState(0);
  const [eventClickType, setEventClickType] = useState("");
  const [prevClickType, setPrevClickType] = useState("number");
  const [numberToCalculate, setNumberToCalculate] = useState(0);

  const clearAll = () => {
    setResultState(0);
    setWholeArithmetic("");
    setPrevOperator("+");
    setEventOperator("");
    setPrevNumber(0);
    setEventNumber(0);
    setEventClickType("");
    setPrevClickType("number");
    setNumberToCalculate(0);
  };
  const equalClick = () => {
    const newResultState = calculateNumbers(
      resultState,
      prevOperator,
      numberToCalculate
    );
    setResultState(newResultState);
    setPrevOperator("+");
    setPrevClickType("operator");
    setPrevNumber(0);
  };

  const numClick = (e) => {
    //  이퀄 기호 클릭에 대해서 예외처리 해줘야 한다.
    if (e.target.value === "=") {
      equalClick();
      return;
    }
    // const eventNumberConst = Number(e.target.value);
    let thisNumTotal = 0;
    // setEventNumber(e.target.value);
    console.log("prevClickType", prevClickType);
    if (prevClickType === "number") {
      thisNumTotal = Number(addNumberToTail(prevNumber, e.target.value));
      console.log("thisNumTotal", thisNumTotal);
      setNumberToCalculate(thisNumTotal);
      setPrevNumber(thisNumTotal);
    } else {
      setNumberToCalculate(e.target.value);
      setPrevNumber(e.target.value);
    }
    //  전체 연산 String에 숫자를 붙여준다.
    const newWholeArithmetic = addNumberToWholeArithmetic(
      wholeArithmetic,
      e.target.value
    );
    setWholeArithmetic(newWholeArithmetic);
    console.log(newWholeArithmetic);

    //  prevClickType 을 number 로 바꿔준다.
    setPrevClickType("number");
  };
  const operatorClick = (e) => {
    if (e.target.value === "clear") {
      clearAll();
      return;
    }
    //  1.전체 연산 String에 숫자를 붙여준다.
    const newWholeArithmetic = addNumberToWholeArithmetic(
      wholeArithmetic,
      e.target.value
    );
    setWholeArithmetic(newWholeArithmetic);
    console.log(newWholeArithmetic);

    //  2.이제까지의 토탈 연산값 에, 직전 연산자와, 직전 숫자 값 을 넣어 계산한다.
    //  resultState
    //  prevOperator
    //  numberToCalculate
    const newResultState = calculateNumbers(
      resultState,
      prevOperator,
      numberToCalculate
    );
    setResultState(newResultState);
    setPrevOperator(e.target.value);

    //  3.이벤트 연산자를 저장한다.
    //  eventOperator

    //  4.이벤트 클릭의 종류를 저장한다.
    //  eventClickType

    //  5. prevClickType 을 operator 로 바꿔준다.
    setPrevClickType("operator");

    setPrevNumber(0);
  };

  return (
    <div className="Calculator aparatFrame">
      <h1>Calculator 0.2</h1>

      <div className="statesContainer">
        <div className="wholeArithmetic">{wholeArithmetic}</div>
        <div className="numberToCalculate">{numberToCalculate}</div>
        <div className="resultState">{resultState}</div>
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

export default CalculatorV02;
