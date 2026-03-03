const screenElement = document.querySelector("input");
const lastEquation = document.querySelector("p.lastEquation"); // broken?
const operatorButtons = document.querySelectorAll("button.oper");
const numberButtons = document.querySelectorAll("button.num");
const otherButtons = document.querySelectorAll("button.other");

const operators = ["+", "-", "*", "%"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];

let history = [];

document.addEventListener("keydown", (event) => {
    const key = event.key;
    console.log(key);
    if (numbers.includes(key)) {
        numberEvent(event, key);
    } else if (key === "-" && screenElement.value.length == 0) {
        // deferentiate between neg and substract
        numberEvent(event, key);
    } else if (operators.includes(key)) {
        operatorEvent(event, key);
    } else {
        otherEvent(event, key);
    }
});

numberButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        numberEvent(event, button.innerText);
    });
});

function numberEvent(event, number) {
    event.preventDefault();
    if (number != "." || !screenElement.value.includes(".")) {
        screenElement.value = screenElement.value + number;
    }
}

operatorButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        operatorEvent(event, button.innerText);
    });
});

function operatorEvent(event, operator) {
    event.preventDefault();
    // only allow an operator to be added after a number
    if (screenElement.value) {
        // check if another operator is present, if so go head and calculate current values
        if (includesOperator(screenElement.value)) {
            operate(screenElement.value);
        }
        // allow operator to be added
        screenElement.value = `${screenElement.value} ${operator} `;
    }
}

otherButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        otherEvent(event, button.innerText);
    });
});

function otherEvent(event, value) {
    event.preventDefault();
    if ((value === "=" || value === "Enter") && includesOperator(screenElement.value)) {
        if (screenElement.value.length > 0) {
            operate(screenElement.value);
        }
    } else if (value === "-") {
        screenElement.value = screenElement.value + value;
    } else if (value === "delete" || value === "Backspace") {
        screenElement.value = screenElement.value.slice(0, -1);
    } else if (value === "clear") {
        history = [];
        lastEquation.innerText = "";
        screenElement.value = "";
    }
}

function includesOperator(screenValue) {
    // slice here does not check first character incase of neg number
    return operators.some((op) => screenValue.slice(1).includes(op));
}

function operate(text) {
    history.push(text);
    let value;
    parsedText = text.split(" ");
    let a = +parsedText[0];
    let b = +parsedText[2];
    let op = parsedText[1];

    if (op === "%" && (a == 0 || b == 0)) {
        // figure out error handling
        screenElement.value = "";
    } else {
        //calculate
        switch (op) {
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
        lastEquation.textContent = text;
        screenElement.value = value;
    }
}
