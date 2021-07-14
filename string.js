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

let x;
let y;
let number = [];
let sign = "";
let isSign = false;
let unaryToggle = false;
let decimalToggle = false;
let runningTotal = false;
let isPercent = false;
let total;

// Basic math functions 

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

function operate(x, sign, y) {
        sign === "+" ? output.textContent = add(x, y) :
        sign === "-" ? output.textContent = subtract(x, y) :
        sign === "*" ? output.textContent = multiply(x, y) :
        sign === "/" ? output.textContent = divide(x, y) :
        output.textContent = "Error"
};        
    
// Function to capture a number and store it in a variable

function getNumber(digit) {
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

function getTotal() {
    if (!runningTotal) {
        operate(x, sign, y);
        runningTotal = true;
        console.log(x, sign, y);
    } else if (runningTotal) {
        operate(total, sign, y);
        console.log(total, sign, y);
    }    
}

// function getTotal() {
//     if (!runningTotal) {
//         total = x;
//         runningTotal = operate(total, sign, y);
//         output.TextContent = runningTotal.toFixed(2);
//         return runningTotal;
//     } else if (runningTotal) {
//         total = runningTotal;
//         runningTotal = operate(total, sign, y);
//         output.TextContent = runningTotal.toFixed(2);
//         return runningTotal;
//     }
// }

// Add event listener for numbers

[...numButtons].forEach((numBtn) => {
    numBtn.addEventListener('click', () => {
        if (number.length === 9) return; 
        let digit = numBtn.value;
        getNumber(digit);
    });    
});   

// Add event listener for decimal button

decimal.addEventListener('click', () => {
    if (decimalToggle) return;
    number.push(".");
    decimalToggle = true;
});

// Add event listener for unary operator button

unary.addEventListener('click', () => {
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

// Add event listener for sign

[...signButtons].forEach((signBtn) => {
    signBtn.addEventListener('click', () => {
        isPercent = false;
        decimalToggle = false;
        if (isSign) {
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

// // Add event listener for equals button

equals.addEventListener('click', () => {
    number.length = 0;
    getTotal();
});

// // // Add event listener for clear button

clear.addEventListener('click', () => {
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
});

