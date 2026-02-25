const screenElement = document.querySelector("input");
const lastEquation = document.querySelector("p.lastEquation"); // broken?
const operatorButtons = document.querySelectorAll("button.oper");
const numberButtons = document.querySelectorAll("button.num");
const otherButtons = document.querySelectorAll("button.other");

const operators = ["+", "-", "*", "%"];
const numbers = "0123456789";

let history = [];

numberButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        screenElement.value = screenElement.value + button.innerText;
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        // only allow an operator to be added after a number
        if (screenElement.value) {
            // check if another operator is present, if so go head and calculate current values
            // slice here does not check first character incase of neg number
            if (operators.some((op) => screenElement.value.slice(1).includes(op))) {
                operate(screenElement.value);
            }
            // allow operator to be added
            screenElement.value = `${screenElement.value} ${button.innerText} `;
        }
    });
});

otherButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        if (button.innerText === "=") {
            operate(screenElement.value);
        } else if (button.innerText === "-") {
            screenElement.value = screenElement.value + button.innerText;
        } else if (button.innerText === "delete") {
            screenElement.value = screenElement.value.slice(0, -1);
        } else if (button.innerText === "clear") {
            history = [];
            screenElement.value = "";
        }
    });
});

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
        // lastEquation.textContent = text;
        screenElement.value = value;
    }
}
