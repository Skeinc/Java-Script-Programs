// Get coefficient
const coefficientA = 2;
const coefficientB = -1;
const coefficientC = -15;

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

// Get result
findRotes();