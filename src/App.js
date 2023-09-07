import logo from "./logo.svg";
import "./App.css";
import "./styles.css";
import Calculator from './components/Calculator.js'

function App() {
  return (
  <div className="App">

    <div className="calculator">
      {/* output */}
      <div className="output">
        <div className="last-operand"></div>
        <div className="current-operand"></div>

        {/* Grid area */}
        <button className="span-two">AC</button>
        <button>DEL</button>
        <button>÷</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>*</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>+</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>-</button>
        <button>.</button>
        <button>0/button>
        <button className='span-two'>=</button>
      </div>
    </div>
  </div>
   );
}

export default App;
