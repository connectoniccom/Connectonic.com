
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft } from 'lucide-react';

const CalculatorPage = () => {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState('');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [memory, setMemory] = useState<number>(0);

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    if (key >= '0' && key <= '9') handleDigitClick(key);
    else if (['+', '-', '*', '/'].includes(key)) handleOperatorClick(key);
    else if (key === '.') handleDecimalClick();
    else if (key === 'Enter' || key === '=') {
      event.preventDefault();
      handleEqualsClick();
    } else if (key === 'Backspace') handleBackspace();
    else if (key === 'Escape') handleClearClick();
    else if (key === '%') handleUnaryOperatorClick('%');
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display, firstOperand, operator, waitingForSecondOperand]);

  const handleDigitClick = (digit: string) => {
    if (display === 'Error') {
      setDisplay(digit);
      setHistory('');
      return;
    }
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };
  
  const handleOperatorClick = (nextOperator: string) => {
    if (display === 'Error') return;
    const inputValue = parseFloat(display);

    if (operator && !waitingForSecondOperand && firstOperand !== null) {
      const result = calculate(firstOperand, inputValue, operator);
      if (result === 'Error') {
        setDisplay('Error');
        setHistory('');
        return;
      }
      setDisplay(String(result));
      setFirstOperand(result);
      setHistory(String(result) + ' ' + nextOperator);
    } else {
      setFirstOperand(inputValue);
      setHistory(display + ' ' + nextOperator);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (first: number, second: number, op: string): number | 'Error' => {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '*': return first * second;
      case '/':
        if (second === 0) return 'Error';
        return first / second;
      case '^': return Math.pow(first, second);
      default: return second;
    }
  };
  
  const handleUnaryOperatorClick = (unaryOperator: string) => {
    if (display === 'Error') return;
    const inputValue = parseFloat(display);
    let result: number | 'Error' = 0;
    switch (unaryOperator) {
        case 'sin': result = Math.sin(inputValue * Math.PI / 180); break;
        case 'cos': result = Math.cos(inputValue * Math.PI / 180); break;
        case 'tan': result = Math.tan(inputValue * Math.PI / 180); break;
        case 'log': result = Math.log10(inputValue); break;
        case 'ln': result = Math.log(inputValue); break;
        case 'sqrt': result = Math.sqrt(inputValue); break;
        case 'sqr': result = Math.pow(inputValue, 2); break;
        case '%': result = inputValue / 100; break;
        case '1/x': 
          if(inputValue === 0) {
            result = 'Error';
          } else {
            result = 1 / inputValue;
          }
          break;
        case '+/-': result = inputValue * -1; break;
    }

    if (result === 'Error' || isNaN(result as number) || result === Infinity || result === -Infinity) {
      setDisplay('Error');
      setHistory('');
    } else {
      setDisplay(String(result));
      setHistory(`${unaryOperator}(${inputValue})`);
    }
    setWaitingForSecondOperand(true);
  };
  
  const handleEqualsClick = () => {
    if (display === 'Error' || operator === null || firstOperand === null || waitingForSecondOperand) return;
    
    const inputValue = parseFloat(display);
    const result = calculate(firstOperand, inputValue, operator);

    if (result === 'Error') {
      setDisplay('Error');
      setHistory('');
    } else {
      setHistory(`${firstOperand} ${operator} ${inputValue} =`);
      setDisplay(String(result));
    }

    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleClearClick = () => {
    setDisplay('0');
    setHistory('');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleDecimalClick = () => {
    if (display === 'Error') return;
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
    if (waitingForSecondOperand || display === 'Error') return;
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  }

  const handleMemoryClick = (memOp: 'M+' | 'M-' | 'MR' | 'MC') => {
    if (display === 'Error') return;
    const currentValue = parseFloat(display);
    switch(memOp) {
      case 'M+': setMemory(memory + currentValue); break;
      case 'M-': setMemory(memory - currentValue); break;
      case 'MR': setDisplay(String(memory)); break;
      case 'MC': setMemory(0); break;
    }
     setWaitingForSecondOperand(true);
  };
  
  const handleConstantClick = (constant: 'π' | 'e') => {
    const value = constant === 'π' ? Math.PI : Math.E;
    setDisplay(String(value));
    setWaitingForSecondOperand(false);
  }

  return (
    <div className="flex justify-center items-center h-full p-4 bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm shadow-2xl bg-card">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Scientific Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-2 mb-4">
            <div className="text-right text-muted-foreground text-sm h-6 pr-2 truncate">{history || ' '}</div>
            <Input
              type="text"
              className="text-right text-4xl font-mono h-auto bg-transparent border-0 ring-0 focus-visible:ring-0"
              value={display}
              readOnly
              aria-label="Calculator display"
            />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {/* Row 1 */}
            <Button variant="outline" onClick={() => handleUnaryOperatorClick('sqr')}>x²</Button>
            <Button variant="outline" onClick={() => handleOperatorClick('^')}>xʸ</Button>
            <Button variant="outline" onClick={() => handleUnaryOperatorClick('sin')}>sin</Button>
            <Button variant="outline" onClick={() => handleUnaryOperatorClick('cos')}>cos</Button>
            <Button variant="outline" onClick={() => handleUnaryOperatorClick('tan')}>tan</Button>

            {/* Row 2 */}
            <Button variant="outline" onClick={() => handleUnaryOperatorClick('sqrt')}>√</Button>
            <Button variant="outline" onClick={() => handleConstantClick('π')}>π</Button>
            <Button variant="outline" onClick={() => handleUnaryOperatorClick('log')}>log</Button>
            <Button variant="outline" onClick={() => handleUnaryOperatorClick('ln')}>ln</Button>
             <Button variant="outline" onClick={() => handleConstantClick('e')}>e</Button>
            
            {/* Row 3 */}
            <Button variant="secondary" onClick={handleClearClick}>C</Button>
            <Button variant="secondary" onClick={() => handleUnaryOperatorClick('+/-')}>+/-</Button>
            <Button variant="secondary" onClick={() => handleUnaryOperatorClick('%')}>%</Button>
            <Button variant="secondary" size="icon" onClick={handleBackspace}><ChevronLeft /></Button>
            <Button variant="destructive" onClick={() => handleOperatorClick('/')}>÷</Button>
            
            {/* Row 4 */}
            <Button variant="outline" onClick={() => handleMemoryClick('MC')}>MC</Button>
            <Button onClick={() => handleDigitClick('7')}>7</Button>
            <Button onClick={() => handleDigitClick('8')}>8</Button>
            <Button onClick={() => handleDigitClick('9')}>9</Button>
            <Button variant="destructive" onClick={() => handleOperatorClick('*')}>×</Button>

            {/* Row 5 */}
            <Button variant="outline" onClick={() => handleMemoryClick('MR')}>MR</Button>
            <Button onClick={() => handleDigitClick('4')}>4</Button>
            <Button onClick={() => handleDigitClick('5')}>5</Button>
            <Button onClick={() => handleDigitClick('6')}>6</Button>
            <Button variant="destructive" onClick={() => handleOperatorClick('-')}>-</Button>

            {/* Row 6 */}
            <Button variant="outline" onClick={() => handleMemoryClick('M+')}>M+</Button>
            <Button onClick={() => handleDigitClick('1')}>1</Button>
            <Button onClick={() => handleDigitClick('2')}>2</Button>
            <Button onClick={() => handleDigitClick('3')}>3</Button>
            <Button variant="destructive" onClick={() => handleOperatorClick('+')}>+</Button>

            {/* Row 7 */}
            <Button variant="outline" onClick={() => handleMemoryClick('M-')}>M-</Button>
            <Button className="col-span-2" onClick={() => handleDigitClick('0')}>0</Button>
            <Button onClick={handleDecimalClick}>.</Button>
            <Button variant="primary" className="bg-green-600 hover:bg-green-700" onClick={handleEqualsClick}>=</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalculatorPage;
