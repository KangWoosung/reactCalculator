import React, { useState, useReducer, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import Numbtn from "../components/Numbtn.js";
import reducer04 from "../reducer/reducer.v.0.4.js";
import initialState from "../initialState/calculator.0.4.js";

/*  2023-05-15 07:33:02

setState( (prevState) => {
    const { input, operator, wholeArithmetic, resultState } = prevState;
    return {
        ...prevState,
        input: input + eventNumber,
    }
})
이 구문이야 말로, React 의 핵심이자 코어 정신이라고 말할 수 있겠다.
쌩 자바스크립트로 계산기를 짜려면, 직전 숫자, 직전 연산자, 다음 숫자, 다음 연산자 등등이 변수에 복잡복잡하게 바글바글 들어가고 관리해야 하는데,
리액트에서는, 직전 State 를 prevState 로 신나게 가볍게 꺼내와서 쓸 수 있다.
어쩌면, React 의 가장 큰 장점이 바로 prevState 와 관련된 점이 아닐까 싶다.

이 구문에 친숙해지고 익숙해지기 위해 직전 버전에서 작업하였고, 
이번엔 useReducer 에서도 같은 로직을 경험해보려고 한다.
reducer 에서도 prevState 를 활용하는 방법을 찾아보고, reducer 만의 장점을 찾아보자.

1. initialState 를 정의해보자.

2. 그리고 reducer 를 정의하고,

3. action 도 따로 정의해서 사용해보자.

기억을 되살려.. reducer 의 작동방식을 생각해보면,
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name,
    });
  }, []);
이렇게 하면 된다.
action 은, initialState 의 변형이고,
numClick() 에, dispatch 를 걸어주면 된다.

type 의 종류부터 정의해보자.
ADD, SUBTRACT, MULTIPLY, DIVIDE, CLEAR, EQUAL, CHANGE_INPUT


*/

const CalculatorV04 = () => {
  const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, ".", "="];
  const operators = ["+", "-", "*", "/", "clear"];
  const [state, dispatch] = useReducer(reducer04, initialState);

  const operatorClick = useCallback((event) => {
    const eventOperator = event.target.value;
    dispatch({
      type: "CALC_SYMBOL",
      prevOperator: state.operator,
      payload: eventOperator,
    });
  }, []);

  const numClick = useCallback((e) => {
    const eventNumber = e.target.value;
    dispatch({
      type: "ADD_NUMBER",
      payload: eventNumber,
    });
  }, []);

  return (
    <div className="Calculator aparatFrame">
      <h1>Calculator 0.4</h1>
      <div className="statesContainer">
        <div className="wholeArithmetic">{state.wholeArithmetic}</div>
        <div className="numberToCalculate">{state.input}</div>
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

export default CalculatorV04;
