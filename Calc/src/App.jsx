import { useState } from 'react';
import './App.css';

export default function App() {
  const [num1, setNum1] = useState('0');
  const [operator, setOperator] = useState('');
  const [result, setResult] = useState('0');
  const [reset, setReset] = useState(false);
  const [hasDecimal, setHasDecimal] = useState(false);
  const [hasOperator, setHasOperator] = useState(false); // New state variable to track if operator has been entered

  function getInputValue(value) {
    if (value === '.') {
      if (hasDecimal) {
        return;
      }
      setHasDecimal(true);
    }

    setNum1(prevValue => {
      if (prevValue === '0' && value !== '.') {
        return value;
      } else {
        return prevValue + value;
      }
    });
    setReset(false);
  }

  const allclear = () => {
    setNum1('0');
    setResult('0');
    setHasDecimal(false);
    setHasOperator(false); // Reset hasOperator when clearing
  };

  function Calculate() {
    let res = eval(num1.toString());
    if (isNaN(res)) {
      setResult("NaN");
    } else {
      setResult(res);
      setNum1(res.toString());
    }
    setReset(true);
    setHasDecimal(false);
    setHasOperator(false); // Reset hasOperator after calculation
  }

  const clear = () => {
    if (num1.length === 1 || num1 === '0') {
      setNum1('0');
    } else {
      setNum1(prevValue => prevValue.slice(0, -1));
    }
    setReset(false);
    if (num1[num1.length - 1] === '.') {
      setHasDecimal(false);
    }
    if (/[+\-*\/]$/.test(num1)) {
      setHasOperator(false); // Reset hasOperator if last character removed is an operator
    }
  };

  function getOperator(value) {
    // Check if the last character of the current operand is an operator
    const lastCharacterIsOperator = /[\+\-\*\/]$/.test(num1);
  
    // If the last character is not an operator or the current value is '-', allow adding the operator
    if (!lastCharacterIsOperator || value === '-') {
      setOperator(value);
      setNum1(prevValue => prevValue + value);
    }
  
    setReset(false);
    setHasDecimal(false); // Reset hasDecimal when operator is added
  }
  

  return (
    <div className="App">
      <div className="container">
        <h1>Calculator</h1>
        <div className="calculator">
          <div className="display">
            <div className="prev" id='previousData'>{result}</div>
            <div className="curr" id='currentData'>{reset ? result : num1}</div>
          </div>
          <div className="buttons">
            <div className="first">
              <button id="allClear" onClick={allclear}>AC</button>
              <button id='clear' onClick={clear}>Clear</button>
              <button id="divide" onClick={() => getOperator('/')}>÷</button>
            </div>
            <div className="second">
              <button id="seven" onClick={() => getInputValue('7')}>7</button>
              <button id="eight" onClick={() => getInputValue('8')}>8</button>
              <button id="nine" onClick={() => getInputValue('9')} >9</button>
              <button id="multiply" onClick={() => getOperator('*')}>*</button>
            </div>
            <div className="third">
              <button onClick={() => getInputValue('4')} id="four">4</button>
              <button onClick={() => getInputValue('5')} id="five">5</button>
              <button onClick={() => getInputValue('6')} id="six">6</button>
              <button id="subtract" onClick={() => getOperator('-')}>-</button>
            </div>
            <div className="fourth">
              <button onClick={() => getInputValue('1')} id="one">1</button>
              <button onClick={() => getInputValue('2')} id="two">2</button>
              <button onClick={() => getInputValue('3')} id="three">3</button>
              <button id="add" onClick={() => getOperator('+')}>+</button>
            </div>
            <div className="fifth">
              <button onClick={() => getInputValue('0')} id="zero">0</button>
              <button id="decimal" onClick={() => getInputValue('.')}>.</button>
              <button id="equals" onClick={Calculate}>=</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
