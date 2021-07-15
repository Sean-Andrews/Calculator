// Create constants

const numButtons = document.getElementsByClassName('num-btn');
const signButtons = document.getElementsByClassName('sign-btn');
const equals = document.getElementById('equals-btn');
const clear = document.getElementById('clear-btn');
const display = document.getElementById('output');
const decimal = document.getElementById('item-decimal');
const unary = document.getElementById('unary-btn');
const percent = document.getElementById('percent-btn');

// initialize variables and arrays
// Most are boolean values to check conditions as functions are called

let x;
let y;
let number = [];
let sign = "";
let isSign = false;
let unaryToggle = false;
let decimalToggle = false;
let runningTotal = false;
let isPercent = false;
let lastEquals = false;
let total;

// Create basic math functions 
// Round to 2 decimal places

function add(x, y) {
    let temp = x + y;
    total = Math.round((temp + Number.EPSILON) * 100) / 100;
    return total;
}

function subtract(x, y) {
    let temp = x - y;
    total = Math.round((temp + Number.EPSILON) * 100) / 100;
    return total;
}

function multiply(x, y) {
    let temp = x * y;
    total = Math.round((temp + Number.EPSILON) * 100) / 100;
    return total;
}

function divide(x, y) {
    let temp = x / y;
    total = Math.round((temp + Number.EPSILON) * 100) / 100;
    return total;
}

// Create operate function
// Calls basic math function dependent on the sign input

function operate(x, sign, y) {
        sign === "+" ? output.textContent = add(x, y) :
        sign === "-" ? output.textContent = subtract(x, y) :
        sign === "*" ? output.textContent = multiply(x, y) :
        sign === "/" ? output.textContent = divide(x, y) :
        output.textContent = "Error"
};        
    
// Function to capture a number and store it in a variable
// Checks for the presence of a sign...if false, stores a variable as x.
// All subsequent values are stored as a new y until the user clears the data.

function getNumber(digit) {
    lastEquals = false;
    if (!isSign) {
        number.push(digit);
        let strNum = number.join('');
        x = Number(strNum);
        isPercent ? (display.textContent = x * 0.01) : (display.textContent = x);
        x = Number(display.textContent);
        return x;
    } else if (isSign) {
        number.push(digit);
        let strNum = number.join('');
        y = Number(strNum);
        isPercent ? (display.textContent = y * 0.01) : (display.textContent = y);
        y = Number(display.textContent);
        return y;
    }    

}

// Function to get the total
// Checks the presence of a boolean value to see if it is a first equation or a subsequent occasion.

function getTotal() {
    if (!runningTotal) {
        operate(x, sign, y);
        runningTotal = true;
    } else if (runningTotal) {
        operate(total, sign, y);
    }    
}

// Function that calls the total when equals is pressed
// Checks several conditions so as not to call an error when pressed before data is entered

function equalsSign() {
    if (isSign === false || x === undefined || y === undefined) {;
        return;
    }
    number.length = 0;
    getTotal();
    lastEquals = true;
}    

// Function to use the keyboard 
// Better way to code this?

function useKeyboard(e) {
    if (e.keyCode === 48) getNumber(0);  
    if (e.keyCode === 49) getNumber(1); 
    if (e.keyCode === 50) getNumber(2); 
    if (e.keyCode === 51) getNumber(3); 
    if (e.keyCode === 52) getNumber(4); 
    if (e.keyCode === 53) getNumber(5); 
    if (e.keyCode === 54) getNumber(6); 
    if (e.keyCode === 55) getNumber(7); 
    if (e.keyCode === 56) getNumber(8); 
    if (e.keyCode === 57) getNumber(9); 
    if (e.keyCode === 13) equalsSign();
    if (e.keyCode === 27) clearAll();
}

// Function to clear all data

function clearAll() {
    x = null;
    y = null;
    total = null;
    number.length = 0;
    sign = "";
    isSign = false;
    output.textContent = "0";
    decimalToggle = false;
    unaryToggle = false;
    isPercent = false;
    runningTotal = false;
    lastEquals = false;
}

// Add event listener for numbers
// Limits the amount of numbers in the display to 9 

[...numButtons].forEach((numBtn) => {
    numBtn.addEventListener('click', () => {
        if (number.length === 9) return; 
        let digit = numBtn.value;
        getNumber(digit);
    });    
});   

// Add event listener for decimal button
// Checks if a boolean value is true...if it is false, adds a decimal

decimal.addEventListener('click', () => {
    if (decimalToggle) return;
    number.push(".");
    decimalToggle = true;
});

// Add event listener for unary operator button
// Toggles the negative sign

unary.addEventListener('click', () => {
    if (number.length === 0) return;
    if (number[0] === "-") {
        number.shift();
        getNumber();
    } else {
        number.unshift("-");
        getNumber();
    }
});

// Add event listener for percent button

percent.addEventListener('click', () => {
    isPercent = true;
    getNumber();
});

// Add event listener and functionality for sign.  
// Uses boolean variables to reset the ability to add decimals or to continue equations before an equals sign is pressed
// How can I write this as a seperate function to refer to for keyboard functionality?

[...signButtons].forEach((signBtn) => {
    signBtn.addEventListener('click', () => {
        isPercent = false;
        decimalToggle = false;
        if (lastEquals) {
            sign = signBtn.value;
            return sign;
        } else if (isSign) {
            getTotal();
            number.length = 0;
            sign = signBtn.value;
            return sign;
        } else {
            number.length = 0;
            sign = signBtn.value;
            isSign = true;
            return sign;
        }    
    });
});

// Add event listener for equals button

equals.addEventListener('click', equalsSign);

// Add event listener for clear button

clear.addEventListener('click', clearAll);

// Add event listener for numeric keyboard presses

window.addEventListener('keydown', useKeyboard);