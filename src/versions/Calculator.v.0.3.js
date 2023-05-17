import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Numbtn from "../components/Numbtn.js";

/*  2023-05-15 05:19:05
외운 거 철저히 활용하는 다음 버전 0.3
setState(  prevState ⇒ {   
    const { all, the, prev, states } = prevState;
    if( some.condition) {
        return (  {…prevState, new: newVal } )
    }
});

2023-05-15 05:50:25
Initial State 정의가 중요하다.

    input: "0",                 //  현재 입력된 숫자 또는 연산부호
    operator: null,             //  직전 연산자
    wholeArithmetic: "",        //  전체 연산 String
    numberToCalculate: 0,       //  연산에 추가되고 계산처리될 숫자
    resultState: 0,             //  현재까지의 연산 결과 값

2023-05-15 07:15:49
제법 흡족한 결과물을 얻었다.
코드도 제법 정돈되었고, 불필요한 state도 없앴다.

이제 어디로 가볼까..
reducer 를 사용하는 방법으로 다시 도전해보자.
setState( prevState ⇒ { 
    const { all, the, prev, states } = prevState;
 })
이게 상당히 중요한 구문이라서, 좀 더 익숙해지면 좋겠는데,
reducer 로도 이 구문을 사용할 수가 있나?

*/
function calculateNumbers(resultState, operator, input) {
  let newResultState = 0;
  switch (operator) {
    case "+":
      newResultState = Number(resultState) + Number(input);
      break;
    case "-":
      newResultState = Number(resultState) - Number(input);
      break;
    case "*":
      newResultState = Number(resultState) * Number(input);
      break;
    case "/":
      newResultState = Number(resultState) / Number(input);
      break;
    case "clear":
      newResultState = 0;
      break;
    default:
      newResultState = Number(input);
      break;
  }
  return newResultState;
}

const CalculatorV03 = () => {
  const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, ".", "="];
  const operators = ["+", "-", "*", "/", "clear"];
  const [state, setState] = React.useState({
    input: 0,
    operator: "+",
    wholeArithmetic: "",
    numberToCalculate: 0,
    resultState: 0,
  });

  const numClick = (event) => {
    const eventNumber = event.target.value;
    setState((prevState) => {
      const { input, operator, wholeArithmetic, resultState } = prevState;
      //  2023-05-15 07:15:36
      //  GPT 가 이 초기화를 문자열로 하라고 하도 고집피워서 그렇게 했다. 뭐가 바뀐건지는 모르겠다.
      let inputToAdd = "";
      // 초기화 상태에서의 숫자 클릭 대응
      if (input === 0) {
        inputToAdd = eventNumber;
      }
      // equal 기호 클릭 대응
      else if (eventNumber === "=") {
        const newState = calculateNumbers(resultState, operator, input);
        return {
          ...prevState,
          input: 0,
          wholeArithmetic: wholeArithmetic + "=" + String(newState),
          resultState: newState,
        };
      }
      // 숫자 클릭 대응
      else {
        inputToAdd = input + String(eventNumber);
      }
      return {
        ...prevState,
        input: inputToAdd,
        wholeArithmetic: wholeArithmetic + String(eventNumber),
      };
    });
  };
  const operatorClick = (event) => {
    const thisEvent = event.target.value;
    console.log("thisEvent", thisEvent);
    setState((prevState) => {
      const { operator, input, wholeArithmetic, resultState } = prevState;
      if (thisEvent === "clear") {
        return {
          input: 0,
          operator: "+",
          wholeArithmetic: "",
          numberToCalculate: 0,
          resultState: 0,
        };
      } else {
        const newState = calculateNumbers(resultState, operator, input);
        return {
          ...prevState,
          operator: thisEvent,
          input: 0,
          wholeArithmetic: wholeArithmetic + thisEvent,
          resultState: newState,
        };
      }
    });
  };

  return (
    <div className="Calculator aparatFrame">
      <h1>Calculator 0.3</h1>
      <div className="statesContainer">
        <div className="wholeArithmetic">{state.wholeArithmetic}</div>
        <div className="numberToCalculate">{state.numberToCalculate}</div>
        <div className="resultState">{state.resultState}</div>
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

export default CalculatorV03;
