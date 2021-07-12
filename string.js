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

function operate(sign, x, y) {
        if (sign === "+") {
            return add(x, y);
        } else if (sign === "-") {
            return subtract(x, y);
        } else if (sign === "*") {
            return multiply(x, y);
        } else if (sign === "/") {
            return divide(x, y);
        } else {
            return "ERROR"
        }
}