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

            //neg
            if (e.currentTarget.id === '-') { 
                if (screenNumbers.length === 0){
                    screenNumbers += e.currentTarget.id;
                    console.log('called this mo')
                }

                else if (screenNumbers.length > 1) {
                    if(screenNumbers[screenNumbers.length - 1] === '-' && screenNumbers[screenNumbers.length - 2] !== '-'){
                        screenNumbers += e.currentTarget.id;
                        console.log('called this mf')
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

        if(screenNumbersRef.current !== null){
            screenNumbersRef.current.innerHTML = screenNumbers;
        }

        if(e.currentTarget.id in numberArray){
            Number += e.currentTarget.id;
        }
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


        if (e.currentTarget.id === '=') {
            if(Number !== ''){
                screenArray.push(Number);
                Number = '';
            }

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
        <div>
            <div ref={screenNumbersRef}> </div>
            <div ref={screenRef}></div>
            <div id='1' onClick={handleClick}>1</div>
            <div id='2' onClick={handleClick}>2</div>
            <div id='3' onClick={handleClick}>3</div>
            <div id='4' onClick={handleClick}>4</div>
            <div id='5' onClick={handleClick}>5</div>
            <div id='6' onClick={handleClick}>6</div>
            <div id='7' onClick={handleClick}>7</div>
            <div id='8' onClick={handleClick}>8</div>
            <div id='9' onClick={handleClick}>9</div>
            <div id='0' onClick={handleClick}>0</div>
            <div id='+' onClick={handleClick}>+</div>
            <div id='-' onClick={handleClick}>-</div>
            <div id='*' onClick={handleClick}>*</div>
            <div id='/' onClick={handleClick}>/</div>
            <div id='=' onClick={handleClick}>=</div>
        </div>
    </>
  )
}

export default calc