import React from "react";

const CalculatorV031 = () => {
  //  GPT 가 보내준 numClick() 펑션..
  //  let inputToAdd = '';
  //  이 부분 밖에 내가 작성한 코드에서 변경된 내용이 없다.
  //  데이터타입을 엄밀히 보는 기계라 이걸 불편하게 느꼈던 듯..
  const numClick = (event) => {
    const eventNumber = event.target.value;
    setState((prevState) => {
      const { input, operator, wholeArithmetic, resultState } = prevState;
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
        inputToAdd = String(input) + eventNumber;
      }
      return {
        ...prevState,
        input: inputToAdd,
        wholeArithmetic: wholeArithmetic + String(eventNumber),
      };
    });
  };

  return <div>CalculatorV031</div>;
};

export default CalculatorV031;

const initialState = {
  all: null,
  the: null,
  prev: null,
  states: null,
};

function reducer(prevState, action) {
  switch (action.type) {
    case "ADD_INPUT":
      return {
        ...prevState,
        input: prevState.input + action.payload,
      };
    default:
      return prevState;
  }
}

function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function numClick(event) {
    const eventNumber = event.target.value;
    dispatch({ type: "ADD_INPUT", payload: eventNumber });
  }

  return (
    <div>
      <Display value={state.input} />
      <ButtonPanel handleClick={numClick} />
    </div>
  );
}
