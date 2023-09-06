import React, { useState } from "react";

const Calculator = () => {
  const [value, setValue] = useState("");

  const clear = () => {
    setValue(value.slice(0, -1));
  };

  const reset = () => {
    setValue("");
  };

  const total = () => {
    try { 
      let evaluation = new Function('return ' + value);
      let evaluationResult = evaluation()
      setValue(String(evaluationResult));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className='container'>
      <form className="form">
        <label className="text-block">
          <input
            type="text"
            className="input-feild"
            value={value}
            readOnly
          />
        </label>
      </form>
      <div className="btn">
        <div>
          <button
            className="btn button-number"
            value={7}
            onClick={(e) => setValue(value + e.target.value)}
          >
            7
          </button>
          <button
            className="btn button-number"
            value={8}
            onClick={(e) => setValue(value + e.target.value)}
          >
            8
          </button>
          <button
            className="btn button-number"
            value={9}
            onClick={(e) => setValue(value + e.target.value)}
          >
            9
          </button>
          <button className="btn button-number" value="C" onClick={clear}>
            C
          </button>
          </div>

          <div>
          <button
            className="btn button-number"
            value={4}
            onClick={(e) => setValue(value + e.target.value)}
          >
            4
          </button>
          <button
            className="btn button-number"
            value={5}
            onClick={(e) => setValue(value + e.target.value)}
          >
            5
          </button>
          <button
            className="btn button-number"
            value={6}
            onClick={(e) => setValue(value + e.target.value)}
          >
            6
          </button>
          <button
            className="btn button-number"
            value="+"
            onClick={(e) => setValue(value + e.target.value)}
          >
            +
          </button>
          </div>
        
          <div>

          <button
            className="btn button-number"
            value={1}
            onClick={(e) => setValue(value + e.target.value)}
          >
            1
          </button>
          <button
            className="btn button-number"
            value={2}
            onClick={(e) => setValue(value + e.target.value)}
          >
            2
          </button>
          <button
            className="btn button-number"
            value={3}
            onClick={(e) => setValue(value + e.target.value)}
          >
            3
          </button>
          <button
            className="btn button-number"
            value="-"
            onClick={(e) => setValue(value + e.target.value)}
          >
            -
          </button>
          </div>

          <div>
          <button
            className="btn button-number"
            value="."
            onClick={(e) => setValue(value + e.target.value)}
          >
            
          </button>
          <button
            className="btn button-number"
            value={0}
            onClick={(e) => setValue(value + e.target.value)}
          >
            0
          </button>
          <button
            className="btn button-number"
            value="/"
            onClick={(e) => setValue(value + e.target.value)}
          >
            ÷
          </button>
          <button
            className="btn button-number"
            value="*"
            onClick={(e) => setValue(value + e.target.value)}
          >
            x
          </button>
          </div>

          <div>
          <button
            className="btn button-reset"
            value="Reset"
            onClick={reset}
          >
            Reset
          </button>
          <button
            className="btn button-total "
            value="Total"
            onClick={total}
          >
            =
          </button>
          </div>
      </div>
    </div>
    </>
  );
};

export default Calculator;
