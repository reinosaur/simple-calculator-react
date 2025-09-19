import React, { useState } from "react";
import OpButton from "./OpButton";
import NumberButton from "./NumberButton";

const Calculator = () => {
  const buttons = [
    { label: "AC", type: "operator" },
    { label: "C", type: "operator" },
    { label: "%", type: "operator" },
    { label: "/", type: "operator" },
    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "*", type: "operator" },
    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "-", type: "operator" },
    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "+", type: "operator" },
    { label: ".", type: "number" },
    { label: "0", type: "number" },
    { label: "=", type: "operator", wide: true },
];


const [current, setCurrent] = useState("0");
const [previous, setPrevious] = useState(null);
const [operator, setOperator] = useState(null);
const [expression, setExpression] = useState("");

const handleNumber = (num) => {
  setCurrent(current === "0" ? num : current + num);
  setExpression(expression + num);
};

const handleOperator = (op) => {
  if (op === "AC") {
    setCurrent("0");
    setPrevious(null);
    setOperator(null);
    setExpression("");
    return;
  }

  if (op === "C") {
    setCurrent(current.length > 1 ? current.slice(0, -1) : "0");
    setExpression(expression.slice(0,-1));
    return;
  }

  if (op === "=") {
    calculate(true);
    return;
  }

  if (operator && previous !== null) {
    calculate();
  }

  setOperator(op);
  setPrevious(current);
  setExpression(expression + " " + op + " ");
  setCurrent("0");
};

  
const calculate = ( final = false ) => {
  if (operator && previous !== null) {
    const prev = parseFloat(previous);
    const curr = parseFloat(current);
    let result;

    switch (operator) {
      case "+": result = prev + curr; break;
      case "-": result = prev - curr; break;
      case "*": result = prev * curr; break;
      case "/": result = curr === 0 ? "Error" : prev / curr; break;
      case "%": result = prev % curr; break;
      default: return;
    }
    
    setCurrent(result.toString());
     
    if (final) {
      // = was pressed → clear history
      setPrevious(null);
      setOperator(null);
      setExpression("");
    } else {
      // chaining operators
      setPrevious(result.toString());
    }
    }
  };

  return (
     <div className="calculator">
      <div className="display">
        { expression || current }
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn, index) => {
          const colSpan = btn.wide ? "col-span-2" : "col-span-1";

          return btn.type === "number" ? (
            <NumberButton
              key={index}
              label={btn.label}
              onClick={handleNumber} 
              className={colSpan} />
          ) : (
            <OpButton
              key={index}
              label={btn.label}
              onClick={handleOperator}
              className={colSpan} />
          )
          }
        )}
      </div>
    </div>
  );
}

export default Calculator;