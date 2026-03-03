const screenElement = document.querySelector("input");
const lastEquation = document.querySelector("p.lastEquation");
const allButtons = document.querySelectorAll("button");

const operators = ["+", "-", "*", "%"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];

let history = [];
let a, b, oper;

function printScreen() {
    console.log(`a: ${a}, oper: ${oper}, b: ${b}`);
    if (a && oper && b) {
        screenElement.value = `${a} ${oper} ${b}`;
    } else if (a && oper) {
        screenElement.value = `${a} ${oper}`;
    } else if (a) {
        screenElement.value = `${a}`;
    } else {
        screenElement.value = "";
    }
}

document.addEventListener("keydown", (event) => {
    console.log(event.key);
    handleEvents(event, event.key);
});

allButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        console.log(button.innerText);
        handleEvents(event, button.innerText);
    });
});

function handleEvents(event, value) {
    if (numbers.includes(value)) {
        numberEvent(event, value);
    } else if (value === "-" && screenElement.value.length == 0) {
        // deferentiate between neg and substract
        numberEvent(event, value);
    } else if (operators.includes(value)) {
        operatorEvent(event, value);
    } else {
        otherEvent(event, value);
    }
    printScreen();
}

function numberEvent(event, number) {
    event.preventDefault();
    if (!a) {
        a = number;
    } else if (a && !(oper || b)) {
        a = a + number;
    } else if (oper && !b) {
        b = number;
    } else if (b) {
        b = b + number;
    }
}

function operatorEvent(event, operator) {
    event.preventDefault();
    // only allow an operator to be added after a number
    if (a) {
        // check if another operator is present, if so go head and calculate current values
        if (b) {
            operate();
        }
        // allow operator to be added
        oper = operator;
    }
}

function otherEvent(event, value) {
    event.preventDefault();
    if ((value === "=" || value === "Enter") && a && oper && b) {
        operate();
    } else if (value === "-" && !a) {
        a = value;
    } else if (value === "delete" || value === "Backspace") {
        if (a && !(oper || b)) {
            a = a.toString().slice(0, -1);
        } else if (oper && !b) {
            oper = null;
        } else if (b) {
            b = b.toString().slice(0, -1);
        }
    } else if (value === "clear") {
        history = [];
        // needed so that history box does unrender when screen and history are cleared
        lastEquation.innerText = "\u00A0";
        a = null;
        b = null;
        oper = null;
    }
}

function operate() {
    history.push(screenElement.value);
    let value;
    a = +a;
    b = +b;

    if (oper === "%" && (a == 0 || b == 0)) {
        // figure out error handling
        lastEquation.textContent = "Div 0 Error";
        a = null;
        b = null;
        oper = null;
    } else {
        //calculate
        switch (oper) {
            case "+":
                value = a + b;
                break;
            case "-":
                value = a - b;
                break;
            case "*":
                value = a * b;
                break;
            case "%":
                value = a / b;
                break;
        }

        //display
        lastEquation.textContent = screenElement.value;
        screenElement.value = value;
        a = value;
        oper = null;
        b = null;
    }
}
