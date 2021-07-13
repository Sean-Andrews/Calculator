// Create constants

const numButtons = document.getElementsByClassName('num-btn');
const signButtons = document.getElementsByClassName('sign-btn');
const equals = document.getElementById('equals-btn');
const clear = document.getElementById('clear-btn');
const display = document.getElementById('output');

// initialize variables and arrays

let x;
let y;
let runningTotal;
let number = [];
let sign = "";
let total;

// Basic math functions 

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

// Create operate function

function operate(x, sign, y) {
        if (sign === "+") {
            return output.textContent = add(x, y);
        } else if (sign === "-") {
            return output.textContent = subtract(x, y);
        } else if (sign === "*") {
            return output.textContent = multiply(x, y);
        } else if (sign === "/") {
            return output.textContent = divide(x, y);
        } else {
            return "ERROR"
        }
}

// Function to capture a number and store it in a variable

function getNumber() {
    number.push(num);
    output.textContent = number.join("")
    if (sign === "") {
        x = Number(output.textContent);
        return x;
    } else if (sign) {
        y = Number(output.textContent);
        return y;
    }
}

// Function to get the total

function getTotal() {
    if (!runningTotal) {
        total = x;
        runningTotal = operate(total, sign, y);
        output.TextContent = runningTotal;
        return runningTotal;
    } else if (runningTotal) {
        total = runningTotal;
        runningTotal = operate(total, sign, y);
        output.TextContent = runningTotal;
        return runningTotal;
    }
}

// Add event listener for numbers

[...numButtons].forEach((numBtn) => {
    numBtn.addEventListener('click', event => {
        num = Number(numBtn.value);
        getNumber(x);
    });    
});   

// Add event listener for sign

[...signButtons].forEach((signBtn) => {
    signBtn.addEventListener('click', event => {
        number = [];
        sign = signBtn.value
        return sign;
    });
});

// Add event listener for equals button

equals.addEventListener('click', event => {
    number = [];
    getTotal();
});

// // Add event listener for clear button

clear.addEventListener('click', event => {
    x = null;
    y = null;
    total = null;
    firstNumber = [];
    secondNumber = [];
    sign = "";
    output.textContent = "00000";
});



