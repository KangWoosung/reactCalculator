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
        <button>DEL</button>
      </div>
    </div>
  </div>
   );
}

export default App;
