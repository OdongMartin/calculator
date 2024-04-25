'use client'

let firstNumber: number;
let secondNumber: number;
let secondNumberString: string = '';
let screen: string = '';
let operator: string;

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
    if(firstNumber !== undefined && e.currentTarget.id !== '='){
        secondNumberString += e.currentTarget.id;
    }
    
    if ((e.currentTarget.id === '+') && firstNumber === undefined) {
        operator = '+';
        firstNumber = parseInt(screen);
    }
    if ((e.currentTarget.id === '-') && firstNumber === undefined) {
        operator = '-';
        firstNumber = parseInt(screen);
    }
    if ((e.currentTarget.id === '*') && firstNumber === undefined) {
        operator = '*';
        firstNumber = parseInt(screen);
    }
    if ((e.currentTarget.id === '/') && firstNumber === undefined) {
        operator = '/';
        firstNumber = parseInt(screen);
    }

    if ((e.currentTarget.id === '=') ) {
        if (operator === '+'){
            operator = '';
            secondNumber = parseInt(secondNumberString)
            console.log('result', add(firstNumber, secondNumber))
        }
        else if (operator === '-'){
            operator = '';
            secondNumber = parseInt(secondNumberString)
            console.log('result', subtract(firstNumber, secondNumber))
        }
        else if (operator === '*'){
            operator = '';
            secondNumber = parseInt(secondNumberString)
            console.log('result', multiply(firstNumber, secondNumber))
        }
        else if (operator === '/'){
            operator = '';
            secondNumber = parseInt(secondNumberString)
            console.log('result', divide(firstNumber, secondNumber))
        }
    }
    screen += e.currentTarget.id
    console.log(e.currentTarget)
    console.log(screen)
    console.log('second', secondNumberString)


} 

const calc = () => {
  return (
    <>
        <div>
            <div>screen</div>
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