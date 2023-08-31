// Get data
const startScreen = document.querySelector(".start-screen");
const mainScreen = document.querySelector(".main-screen");

// Open start screen when user open calculator
window.addEventListener("load", openStartScreen = () => {
    startScreen.style["display"] = "flex";
    startScreen.children[0].style["animation"] = "1s openScreen";
});

// User click to "NEXT" button from start screen
startScreen.children[0].children[3].addEventListener('click', () => {
    startScreen.children[0].style["animation"] = "0.7s closeScreen";
    setTimeout("startScreen.style['display'] = 'none'", 700);
    mainScreen.style["display"] = "flex";
    setTimeout("mainScreen.children[0].style['animation'] = '1s openScreen'", 700);
});

// User click to "Get result" from main screen
mainScreen.children[0].children[2].children[1].addEventListener('click', () => {
    // Get coefficient
    let coefficientA = +mainScreen.children[0].children[1].children[0].children[1].value;
    let coefficientB = +mainScreen.children[0].children[1].children[1].children[1].value;
    let coefficientC = +mainScreen.children[0].children[1].children[2].children[1].value;

    // Check type of coefficients
    if(typeof coefficientA !== "number") {
        throw new Error("Coefficient A is not a number.");
    }
    if(typeof coefficientB !== "number"){
        throw new Error("Coefficient B is not a number.");
    }
    if(typeof coefficientC !== "number") {
        throw new Error("Coefficient C is not a number.");
    }

    // Finding discriminant
    const D = Math.pow(coefficientB, 2) - 4 * coefficientA * coefficientC;

    // Check discriminant
    function checkDiscriminant(discriminant) {
        if(discriminant < 0) {
            return 0;
        }
        if(discriminant === 0) {
            return 1;
        }
        if(discriminant > 0) {
            return 2;
        }
    }

    // Find rotes
    function findRotes() {
        let numberOfRotes = checkDiscriminant(D);
        if(numberOfRotes === 0) {
            return "No roots.";
        }
        if(numberOfRotes === 1) {
            const X1 = (-coefficientB) / (2 * coefficientA);
            return `X1 = ${X1}`;
        }
        if(numberOfRotes === 2) {
            const X1 = (-coefficientB + Math.sqrt(D)) / (2 * coefficientA);
            const X2 = (-coefficientB - Math.sqrt(D)) / (2 * coefficientA); 
            return `X1 = ${X1}, X2 = ${X2}`;
        }
    }
    try {
        if(mainScreen.children[0].children[1].children[0].children[1].value === '') {
            throw new Error("Coefficient A is empty");
        }
        if(mainScreen.children[0].children[1].children[1].children[1].value === '') {
            throw new Error("Coefficient B is empty");
        }
        if(mainScreen.children[0].children[1].children[2].children[1].value === '') {
            throw new Error("Coefficient C is empty");
        }

        // Get result
        mainScreen.children[0].children[2].children[0].innerHTML = findRotes();
    }
    catch(Error) {
        mainScreen.children[0].children[2].children[0].innerHTML = Error;
    }
});