
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft } from 'lucide-react';

const CalculatorPage = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const handleDigitClick = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleOperatorClick = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (operator && !waitingForSecondOperand && firstOperand !== null) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    } else {
      setFirstOperand(inputValue);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        if (second === 0) return NaN; // Handle division by zero
        return first / second;
      case '^':
        return Math.pow(first, second);
      default:
        return second;
    }
  };

  const handleUnaryOperatorClick = (unaryOperator: string) => {
    const inputValue = parseFloat(display);
    let result = 0;
    switch (unaryOperator) {
        case 'sin':
            result = Math.sin(inputValue * Math.PI / 180); // Degrees to radians
            break;
        case 'cos':
            result = Math.cos(inputValue * Math.PI / 180);
            break;
        case 'tan':
            result = Math.tan(inputValue * Math.PI / 180);
            break;
        case 'log':
            result = Math.log10(inputValue);
            break;
        case 'ln':
            result = Math.log(inputValue);
            break;
        case 'sqrt':
            result = Math.sqrt(inputValue);
            break;
        case 'sqr':
            result = Math.pow(inputValue, 2);
            break;
        case '%':
            result = inputValue / 100;
            break;
        case '1/x':
            result = 1 / inputValue;
            break;
        case '+/-':
            result = inputValue * -1;
            break;
    }
    setDisplay(String(result));
    setWaitingForSecondOperand(true); // Prepares for a new number or operation
  };


  const handleEqualsClick = () => {
    const inputValue = parseFloat(display);
    if (operator && firstOperand !== null && !waitingForSecondOperand) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(null); // Reset for next calculation
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleDecimalClick = () => {
     if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };
  
  const handleBackspace = () => {
    if (waitingForSecondOperand) return;
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  }

  return (
    <div className="flex justify-center items-center h-full p-4">
      <Card className="w-full max-w-sm shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center">Scientific Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            className="text-right text-3xl font-mono p-4 mb-4 h-auto"
            value={display}
            readOnly
          />
          <div className="grid grid-cols-5 gap-2">
            <Button variant="outline" onClick={() => handleUnaryOperatorClick('sin')}>sin</Button>
            <Button variant="outline" onClick={() => handleUnaryOperatorClick('cos')}>cos</Button>
            <Button variant="outline" onClick={() => handleUnaryOperatorClick('tan')}>tan</Button>
            <Button variant="outline" onClick={() => handleUnaryOperatorClick('log')}>log</Button>
            <Button variant="outline" onClick={() => handleUnaryOperatorClick('ln')}>ln</Button>

            <Button variant="outline" onClick={() => handleUnaryOperatorClick('sqrt')}>√</Button>
            <Button variant="outline" onClick={() => handleUnaryOperatorClick('sqr')}>x²</Button>
            <Button variant="outline" onClick={() => handleOperatorClick('^')}>xʸ</Button>
            <Button variant="outline" onClick={() => handleUnaryOperatorClick('1/x')}>1/x</Button>
            <Button variant="secondary" onClick={handleClearClick}>C</Button>

            <Button onClick={() => handleDigitClick('7')}>7</Button>
            <Button onClick={() => handleDigitClick('8')}>8</Button>
            <Button onClick={() => handleDigitClick('9')}>9</Button>
            <Button variant="secondary" onClick={() => handleOperatorClick('/')}>÷</Button>
            <Button variant="secondary" size="icon" onClick={handleBackspace}><ChevronLeft /></Button>

            <Button onClick={() => handleDigitClick('4')}>4</Button>
            <Button onClick={() => handleDigitClick('5')}>5</Button>
            <Button onClick={() => handleDigitClick('6')}>6</Button>
            <Button variant="secondary" onClick={() => handleOperatorClick('*')}>×</Button>
            <Button variant="secondary" onClick={() => handleOperatorClick('-')}>-</Button>

            <Button onClick={() => handleDigitClick('1')}>1</Button>
            <Button onClick={() => handleDigitClick('2')}>2</Button>
            <Button onClick={() => handleDigitClick('3')}>3</Button>
            <Button variant="secondary" className="row-span-2" onClick={() => handleOperatorClick('+')}>+</Button>
            <Button className="row-span-2" onClick={handleEqualsClick}>=</Button>
            
            <Button onClick={() => handleUnaryOperatorClick('%')}>%</Button>
            <Button onClick={() => handleDigitClick('0')}>0</Button>
            <Button onClick={handleDecimalClick}>.</Button>
            <Button onClick={() => handleUnaryOperatorClick('+/-')}>+/-</Button>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalculatorPage;
