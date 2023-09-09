// Screens
const startScreen = document.querySelector(".start-screen");
const mainScreen = document.querySelector(".main-screen");
const addScreen = document.querySelector(".add-screen");
// Buttons
const startButton = startScreen.children[3].children[0];
const addButton = mainScreen.children[0].children[1];
const cancelButton = addScreen.children[4].children[0];
const completeButtons = document.querySelectorAll(".button-complete");
const deleteButtons = document.querySelectorAll('.button-delete');
// Controllers
const allControlller = mainScreen.children[1].children[0];
const evenController = mainScreen.children[1].children[1];
const oddController = mainScreen.children[1].children[2];
const firstController = mainScreen.children[1].children[3];
const lastController = mainScreen.children[1].children[4];

// User click to start button
startButton.addEventListener('click', () => {
    startScreen.style.display = "none";
    mainScreen.style.animation = "nextSlide 0.4s";
    mainScreen.style.display = "flex";
});

// User click to add button
addButton.addEventListener('click', () => {
    mainScreen.style.display = "none";
    addScreen.style.animation = "nextSlide 0.4s";
    addScreen.style.display = "flex";
});

// User click to cancel button
cancelButton.addEventListener('click', () => {
    addScreen.style.animation = "prevSlide 0.4s";
    setTimeout("addScreen.style.display = 'none';\nmainScreen.style.display = 'flex';", 400);
});

// Function for converting to initial form of a to-do list
function normalizeList() {
    // Get items
    const todoItems = document.querySelectorAll('.todo-item');

    for(let i = 0; i < todoItems.length; i++) {
        if(todoItems[i].classList.length > 1) {
            todoItems[i].removeAttribute('class');
            todoItems[i].classList.add('todo-item');
        }
    }

    return todoItems;
}

// Function for add class "active-button" and remove from other buttons
function addActiveButton(button) {
    // Get items
    const controllerButtons = document.querySelectorAll('.controller-button');

    for(let i = 0; i < controllerButtons.length; i++) {
        if(controllerButtons[i].classList.contains('active-button')) {
            controllerButtons[i].classList.remove('active-button');
        }
    }

    return button.classList.add('active-button');
}

// User click to "All Controller"
allControlller.addEventListener('click', () => {
    // Normalize to-do list
    normalizeList();
    // Add active button
    addActiveButton(allControlller);
});

// User click to "Even Controller"
evenController.addEventListener('click', () => {
    // Normalize to-do list
    normalizeList();
    // Add active button
    addActiveButton(evenController);
    // Add class "item-even" to all even items
    const todoItems = document.querySelectorAll('.todo-item');

    for(let i = 0; i < todoItems.length; i++) {
        if(i % 2 === 1) {
            todoItems[i].classList.add('item-even');
        }
    }

    return todoItems;
});

// User click to "Odd Controller"
oddController.addEventListener('click', () => {
    // Normalize to-do list
    normalizeList();
    // Add active button
    addActiveButton(oddController);
    // Add class "item-odd" to all odd items
    const todoItems = document.querySelectorAll('.todo-item');

    for(let i = 0; i < todoItems.length; i++) {
        if(i % 2 === 0) {
            todoItems[i].classList.add('item-odd');
        }
    }

    return todoItems;
});

// User click to "First Controller"
firstController.addEventListener('click', () => {
    // Normalize to-do list
    normalizeList();
    // Add active button
    addActiveButton(firstController);
    // Check for empty to-do list
    const todoItems = document.querySelectorAll('.todo-item');
    try {
        if(todoItems.length === 0) {
            throw new Error("You haven't elements of your to-do list")
        }
    }
    catch(error) {
        return alert(error);
    }
    // Delete first element from to-do list
    return todoItems[0].remove();
});

// User click to "Last Controller"
lastController.addEventListener('click', () => {
    // Normalize to-do list
    normalizeList();
    // Add active button
    addActiveButton(lastController);
    // Check for empty to-do list
    const todoItems = document.querySelectorAll('.todo-item');
    try {
        if(todoItems.length === 0) {
            throw new Error("You haven't elements of your to-do list")
        }
    }
    catch(error) {
        return alert(error);
    }
    // Delete last element from to-do list
    return todoItems[todoItems.length-1].remove();
});

// User click to delete button
for(let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', () => {
        return deleteButtons[i].parentElement.parentElement.remove();
    });
}

// User click to complete button
for(let i = 0; i < completeButtons.length; i++) {
    completeButtons[i].addEventListener('click', () => {
        const completedItem = completeButtons[i].parentElement.parentElement.cloneNode(true);
        const todoList = document.querySelector(".todo-list");
        completeButtons[i].parentElement.parentElement.remove();
        todoList.append(completedItem);
        console.log(completedItem);
    });
}