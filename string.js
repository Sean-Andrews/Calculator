// Create constants

const numButtons = document.getElementsByClassName('num-btn');
const signButtons = document.getElementsByClassName('sign-btn');
const equals = document.getElementById('equals-btn');
const clear = document.getElementById('clear-btn');
const display = document.getElementById('output');

// initialize variables and arrays

let x = 0;
let y = 0;
let firstNumber = [];
let secondNumber = [];
let sign = "";

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

// Function to display first number

function getFirstNumber() {
    firstNumber.push(x);
    output.textContent = firstNumber.join("");
    x = Number(output.textContent);
    return x;
}

// Function to display second number

function getSecondNumber() {
    secondNumber.push(y);
    output.textContent = secondNumber.join("");
    y = Number(output.textContent);
    return y;
}

// Add event listener for numbers

[...numButtons].forEach((numBtn) => {
    numBtn.addEventListener('click', event => {
        if (sign === "") {
            x = Number(numBtn.value);
            getFirstNumber(x);
        } else {
            y = Number(numBtn.value);
            getSecondNumber(y);
        }
    });    
});   

// Add event listener for sign

[...signButtons].forEach((signBtn) => {
    signBtn.addEventListener('click', event => {
        sign = signBtn.value;
        return sign;
    })
})

// Add event listener for equals button

equals.addEventListener('click', event => {
   operate(x, sign, y);
})

// // Add event listener for clear button

clear.addEventListener('click', event => {
    x = 0;
    y = 0;
    firstNumber = [];
    secondNumber = [];
    sign = "";
    output.textContent = "00000";
});




