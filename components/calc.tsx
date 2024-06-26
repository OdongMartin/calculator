'use client'

import { useRef, useEffect } from "react";

const calc = () => {
    let screenArray: string[] = [];
    let Number: string = '';
    let operator: string = '';
    let total: number = 0;
    const screenRef = useRef<HTMLDivElement| null>(null)
    const screenNumbersRef = useRef<HTMLDivElement | null>(null)
    let screenNumbers: string = '';
    const numberArray: string[] = ['0', '1', '2','3','4','5','6','7','8','9']
    const operatorArray: string[] = ['*', '/', '+', '-']
    let previousBackspace: boolean = false;

    type math = (first: number, second:number ) => number;
    type handleClickFunction = (event: React.MouseEvent) => void//number | string

    const add: math = (first: number, second: number) => {
        return first + second
    }
    const subtract: math = (first: number, second: number) => {
        return first - second
    }
    const multiply: math = (first: number, second: number) => {
        return first * second
    }
    const divide: math = (first: number, second: number) => {
        return first / second
    }

    const handleClick: handleClickFunction = (e: React.MouseEvent) => {
        if(e.currentTarget.id in numberArray){
            Number += e.currentTarget.id;
        }

        //screen things
        if(e.currentTarget.id !== '='){

            if (Number !== ''){
                if (e.currentTarget.id === '+') {
                    screenNumbers += e.currentTarget.id;
                }
                if (e.currentTarget.id === '*') {
                    screenNumbers += e.currentTarget.id;
                }
                if (e.currentTarget.id === '/') {
                    screenNumbers += e.currentTarget.id;
                }
            
            }
            if (e.currentTarget.id === '.'){
                if(!Number.includes('.')){
                    screenNumbers += e.currentTarget.id;
                }

            }
            //neg
            if (e.currentTarget.id === '-') { 
                if (screenNumbers.length === 0){
                    screenNumbers += e.currentTarget.id;
                }

                else if (screenNumbers.length > 1) {
                    if(screenNumbers[screenNumbers.length - 1] === '-' && screenNumbers[screenNumbers.length - 2] !== '-'){
                        screenNumbers += e.currentTarget.id;
                    }
                    if(screenNumbers[screenNumbers.length - 1] != '-'){
                        screenNumbers += e.currentTarget.id;
                    }

                } 
    
            }  

            if(e.currentTarget.id in numberArray){
                screenNumbers += e.currentTarget.id;
            }
    
        }

        if(e.currentTarget.id === 'Clear'){
            screenNumbers = ''
            Number = ''
            total = 0
            if(screenRef.current !== null){
                screenRef.current.innerHTML = '0';
            }
        }
        if(e.currentTarget.id === 'Backspace'){
            screenNumbers = screenNumbers.substring(0, screenNumbers.length-1)
            
        }

        if(screenNumbersRef.current !== null){
            screenNumbersRef.current.innerHTML = screenNumbers;
        }

        // behind screen logic

        if (Number !== ''){
            if (e.currentTarget.id === '+') {
                operator = '+';
                screenArray.push(Number);
                screenArray.push(operator);
                Number = '';
                operator = '';
            }
            if (e.currentTarget.id === '*') {
                operator = '*';
                screenArray.push(Number);
                screenArray.push(operator);
                Number = '';
                operator = '';
            }
            if (e.currentTarget.id === '/') {
                operator = '/';
                screenArray.push(Number);
                screenArray.push(operator);
                Number = '';
                operator = '';
            }
        
        }

        if (e.currentTarget.id === '.'){
            if (!Number.includes('.')){
                Number += '.';
            }
        }
    
        if (e.currentTarget.id === '-') {
            operator = '-';

            if(Number !== ''){
                if (Number !== '-'){
                    screenArray.push(Number);
                    screenArray.push(operator);
                    Number = '';
                    operator = '';
                }

            }

            if(Number === '' || screenArray[screenArray.length-1] in operatorArray){
                Number = operator;
                operator = '';
            }

        }

        if(e.currentTarget.id === 'Clear'){
            screenArray = []
            total = 0;
            if(screenRef.current !== null){
                screenRef.current.innerHTML = '0';
            }
        }

        if(e.currentTarget.id === 'Backspace'){
            
            if(Number !== '' /*&& previousBackspace === false*/){
                screenArray.push(Number);
                Number = ''
            }

            if(screenArray.length >= 1){
                let deleted: string = screenArray[screenArray.length - 1].substring(0 , screenArray[screenArray.length - 1].length-1)
                let newScreenArray: string[] =[]
                for (let i = 0; i < screenArray.length-1; i++){
                    newScreenArray.push(screenArray[i]);
                }
                if(deleted !== ''){
                    newScreenArray.push(deleted); 
                }

                screenArray = newScreenArray;
 
            }

            if ((screenArray[screenArray.length - 1] === '*'||screenArray[screenArray.length - 1] === '+' ||screenArray[screenArray.length - 1] === '-'||screenArray[screenArray.length - 1] === '/') && screenArray.length > 1){
                Number = '0'
            }
            else{
                Number = screenArray[screenArray.length - 1]
            }

            //previousBackspace = true;
        }

        // equals
        if (e.currentTarget.id === '=') {
            if(Number !== ''){
                if(screenNumbers.includes('*') || screenNumbers.includes('/') || screenNumbers.includes('+')|| screenNumbers.includes('-')){
                    screenArray.push(Number);
                }

                if(screenArray.length > 2){
                    Number = '';
                }
                // else {
                //     total = parseFloat(Number);
                // }

            }

            // if(screenArray.length < 3 && screenArray[screenArray.length-1] !== '-'){
            //     total = parseFloat(Number);
            // }

            if (screenArray.length >=3){
                for (let i = 0; i < screenArray.length; i++){
                    if ((screenArray[i] === '+')){

                        if (total !== 0){
                            total = add(total, parseFloat(screenArray[i+1]));
                            console.log(total)
                        }
                        else{
                            total = add(parseFloat(screenArray[i-1]), parseFloat(screenArray[i+1]));
                            console.log(total);
                        }
                    }

                    if ((screenArray[i] === '-')){

                        if (total !== 0){
                            total = subtract(total, parseFloat(screenArray[i+1]));
                            console.log(total)
                        }
                        else{
                            total = subtract(parseFloat(screenArray[i-1]), parseFloat(screenArray[i+1]));
                            console.log(total);
                        }
                    }
                    if ((screenArray[i] === '*')){
                        if (total !== 0){
                            total = multiply(total, parseFloat(screenArray[i+1]));
                            console.log(total)
                        }
                        else{
                            total = multiply(parseFloat(screenArray[i-1]), parseFloat(screenArray[i+1]));
                            console.log(total);
                        }
                    }
                    if ((screenArray[i] === '/')){

                        if (total !== 0){
                            total = divide(total, parseFloat(screenArray[i+1]));
                            console.log(total)
                        }
                        else{
                            total = divide(parseFloat(screenArray[i-1]), parseFloat(screenArray[i+1]));
                            console.log(total);
                        }
                    }
                }
                
                if(screenRef.current !== null){
                    screenRef.current.innerHTML = total.toString();
                }
            }
        }

            

        console.log('Number', Number)
        console.log('array', screenArray)
    } 


  return (
    <>
        <div className="flex justify-center items-center ">
            <div className="bg-slate-600 text-white w-60 h-auto rounded-lg">
                <div className="h-20 rounded-lg bg-blue-600">
                    <div className='px-2 font-bold overflow-hidden' ref={screenNumbersRef}>0</div>
                    <div className='p-2 font-extrabold text-2xl'ref={screenRef}>0</div>
                </div>
                <div className="p-4 w-full">
                    <div className="flex gap-4 mb-2">
                        <div className="p-2 bg-gray-500 rounded-full w-20 flex justify-center" style={{cursor: 'pointer'}} id='Clear' onClick={handleClick}>Clear</div>
                        <div className="p-2 bg-gray-500 rounded-full w-36 flex justify-center" style={{cursor: 'pointer'}} id='Backspace' onClick={handleClick}>Backspace</div>
                        
                    </div>
                    <div className="flex gap-4 mb-2">
                        <div className="p-2 bg-gray-500 rounded-full w-12 flex justify-center" style={{cursor: 'pointer'}} id='7' onClick={handleClick}>7</div>
                        <div className="p-2 bg-gray-500 rounded-full w-12 flex justify-center" style={{cursor: 'pointer'}} id='8' onClick={handleClick}>8</div>
                        <div  className="p-2 bg-gray-500 rounded-full w-12 flex justify-center" style={{cursor: 'pointer'}} id='9' onClick={handleClick}>9</div>
                        <div className="p-2 bg-gray-500 rounded-full w-12 flex justify-center" style={{cursor: 'pointer'}} id='*' onClick={handleClick}>*</div>
                    </div>
                    <div className="flex gap-4 mb-2">
                        <div className="p-2 bg-gray-500 rounded-full w-12 flex justify-center" style={{cursor: 'pointer'}} id='4' onClick={handleClick}>4</div>
                        <div className="p-2 bg-gray-500 rounded-full w-12 flex justify-center" style={{cursor: 'pointer'}} id='5' onClick={handleClick}>5</div>
                        <div className="p-2 bg-gray-500 rounded-full w-12 flex justify-center" style={{cursor: 'pointer'}} id='6' onClick={handleClick}>6</div>
                        <div className="p-2 bg-gray-500 rounded-full w-12 flex justify-center" style={{cursor: 'pointer'}} id='-' onClick={handleClick}>-</div>
                    </div>
                    <div className="flex gap-4 mb-2">
                        <div className="p-2 bg-gray-500 rounded-full w-12 flex justify-center" style={{cursor: 'pointer'}} id='1' onClick={handleClick}>1</div>
                        <div className="p-2 bg-gray-500 rounded-full w-12 flex justify-center" style={{cursor: 'pointer'}} id='2' onClick={handleClick}>2</div>
                        <div className="p-2 bg-gray-500 rounded-full w-12 flex justify-center" style={{cursor: 'pointer'}} id='3' onClick={handleClick}>3</div>
                        <div className="p-2 bg-gray-500 rounded-full w-12 flex justify-center" style={{cursor: 'pointer'}} id='+' onClick={handleClick}>+</div>
                    </div>
                    <div className="flex gap-4 ">
                        <div className="p-2 bg-gray-500 rounded-full w-12 flex justify-center" style={{cursor: 'pointer'}} id='0' onClick={handleClick}>0</div>
                        <div className="p-2 bg-gray-500 rounded-full w-12 flex justify-center" style={{cursor: 'pointer'}} id='.' onClick={handleClick}>.</div>
                        <div className="p-2 bg-gray-500 rounded-full w-12 flex justify-center" style={{cursor: 'pointer'}} id='/' onClick={handleClick}>/</div>
                        <div className="p-2 bg-gray-500 rounded-full w-12 flex justify-center" style={{cursor: 'pointer'}} id='=' onClick={handleClick}>=</div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default calc

// 'use client'

// import React, { useState, useEffect } from 'react';

// const Calculator = () => {
//   const [display, setDisplay] = useState('0');
//   const [expression, setExpression] = useState([]);
//   const [currentInput, setCurrentInput] = useState('');
//   const operators = ['+', '-', '*', '/'];

//   const handleButtonClick = (id) => {
//     switch (id) {
//       case 'Clear':
//         clearCalculator();
//         break;
//       case 'Backspace':
//         handleBackspace();
//         break;
//       case '=':
//         handleEqual();
//         break;
//       case '+':
//       case '-':
//       case '*':
//       case '/':
//         handleOperator(id);
//         break;
//       default:
//         handleNumber(id);
//     }
//   };

//   const clearCalculator = () => {
//     setDisplay('0');
//     setExpression([]);
//     setCurrentInput('');
//   };

//   const handleBackspace = () => {
//     if (currentInput.length > 0) {
//       setCurrentInput(currentInput.slice(0, -1));
//     }
//   };

//   const handleOperator = (operator) => {
//     if (currentInput) {
//       setExpression([...expression, currentInput, operator]);
//       setCurrentInput('');
//     } else {
//       // Avoid consecutive operators
//       const lastItem = expression[expression.length - 1];
//       if (operators.includes(lastItem)) {
//         setExpression(expression.slice(0, -1).concat(operator));
//       }
//     }
//   };

//   const handleNumber = (number) => {
//     setCurrentInput(currentInput + number);
//   };

//   const handleEqual = () => {
//     let expr = [...expression, currentInput];
//     if (operators.includes(expr[expr.length - 1])) {
//       expr = expr.slice(0, -1); // remove trailing operator
//     }

//     // Evaluate the expression
//     try {
//       const result = eval(expr.join(''));
//       setDisplay(result.toString());
//       setExpression([]);
//       setCurrentInput('');
//     } catch (e) {
//       setDisplay('Error');
//       setExpression([]);
//       setCurrentInput('');
//     }
//   };

//   useEffect(() => {
//     setDisplay(currentInput || expression.join(' ') || '0');
//   }, [currentInput, expression]);

//   return (
//     <div className="flex justify-center items-center">
//       <div className="bg-slate-600 text-white w-60 h-auto rounded-lg">
//         <div className="h-20 rounded-lg bg-blue-600 p-2 text-2xl font-extrabold">
//           {display}
//         </div>
//         <div className="p-4 w-full">
//           <div className="flex gap-4 mb-2">
//             <div
//               className="p-2 bg-gray-500 rounded-full w-20 flex justify-center"
//               style={{ cursor: 'pointer' }}
//               onClick={() => handleButtonClick('Clear')}
//             >
//               Clear
//             </div>
//             <div
//               className="p-2 bg-gray-500 rounded-full w-36 flex justify-center"
//               style={{ cursor: 'pointer' }}
//               onClick={() => handleButtonClick('Backspace')}
//             >
//               Backspace
//             </div>
//           </div>
//           <div className="flex gap-4 mb-2">
//             <div
//               className="p-2 bg-gray-500 rounded-full w-12 flex justify-center"
//               style={{ cursor: 'pointer' }}
//               onClick={() => handleButtonClick('7')}
//             >
//               7
//             </div>
//             <div
//               className="p-2 bg-gray-500 rounded-full w-12 flex justify-center"
//               style={{ cursor: 'pointer' }}
//               onClick={() => handleButtonClick('8')}
//             >
//               8
//             </div>
//             <div
//               className="p-2 bg-gray-500 rounded-full w-12 flex justify-center"
//               style={{ cursor: 'pointer' }}
//               onClick={() => handleButtonClick('9')}
//             >
//               9
//             </div>
//             <div
//               className="p-2 bg-gray-500 rounded-full w-12 flex justify-center"
//               style={{ cursor: 'pointer' }}
//               onClick={() => handleButtonClick('*')}
//             >
//               *
//             </div>
//           </div>
//           <div className="flex gap-4 mb-2">
//             <div
//               className="p-2 bg-gray-500 rounded-full w-12 flex justify-center"
//               style={{ cursor: 'pointer' }}
//               onClick={() => handleButtonClick('4')}
//             >
//               4
//             </div>
//             <div
//               className="p-2 bg-gray-500 rounded-full w-12 flex justify-center"
//               style={{ cursor: 'pointer' }}
//               onClick={() => handleButtonClick('5')}
//             >
//               5
//             </div>
//             <div
//               className="p-2 bg-gray-500 rounded-full w-12 flex justify-center"
//               style={{ cursor: 'pointer' }}
//               onClick={() => handleButtonClick('6')}
//             >
//               6
//             </div>
//             <div
//               className="p-2 bg-gray-500 rounded-full w-12 flex justify-center"
//               style={{ cursor: 'pointer' }}
//               onClick={() => handleButtonClick('-')}
//             >
//               -
//             </div>
//           </div>
//           <div className="flex gap-4 mb-2">
//             <div
//               className="p-2 bg-gray-500 rounded-full w-12 flex justify-center"
//               style={{ cursor: 'pointer' }}
//               onClick={() => handleButtonClick('1')}
//             >
//               1
//             </div>
//             <div
//               className="p-2 bg-gray-500 rounded-full w-12 flex justify center"
//               style={{ cursor: 'pointer' }}
//               onClick={() => handleButtonClick('2')}
//             >
//               2
//             </div>
//             <div
//               className="p-2 bg-gray-500 rounded-full w-12 flex justify center"
//               style={{ cursor: 'pointer' }}
//               onClick={() => handleButtonClick('3')}
//             >
//               3
//             </div>
//             <div
//               className="p-2 bg-gray-500 rounded-full w-12 flex justify center"
//               style={{ cursor: 'pointer' }}
//               onClick={() => handleButtonClick('+')}
//             >
//               +
//             </div>
//           </div>
//           <div className="flex gap-4">
//             <div
//               className="p-2 bg-gray-500 rounded-full w-12 flex justify center"
//               style={{ cursor: 'pointer' }}
//               onClick={() => handleButtonClick('0')}
//             >
//               0
//             </div>
//             <div
//               className="p-2 bg-gray-500 rounded-full w-12 flex justify center"
//               style={{ cursor: 'pointer' }}
//               onClick={() => handleButtonClick('.')}
//             >