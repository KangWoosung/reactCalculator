import logo from "./logo.svg";
import "./App.css";
import CalculatorV02 from "./versions/Calculator.v.0.2";
import CalculatorV021 from "./versions/Calculator.v.0.21";
import CalculatorV03 from "./versions/Calculator.v.0.3";
import CalculatorV04 from "./versions/Calculator.v.0.4";
import CalculatorV05 from "./versions/Calculator.v.0.5";
import CalculatorV06 from "./versions/Calculator.v.0.6";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello World React</p>
        <CalculatorV06 />
      </header>
    </div>
  );
}

export default App;
