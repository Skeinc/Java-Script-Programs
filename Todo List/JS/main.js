// Screens
const startScreen = document.querySelector(".start-screen");
const mainScreen = document.querySelector(".main-screen");
const addScreen = document.querySelector(".add-screen");
// Buttons
const startButton = startScreen.children[3].children[0];
const addButton = mainScreen.children[0].children[1];
const cancelButton = addScreen.children[4].children[0];
const applyButton = addScreen.children[4].children[1];
// Controllers
const allControlller = mainScreen.children[1].children[0];
const evenController = mainScreen.children[1].children[1];
const oddController = mainScreen.children[1].children[2];
const firstController = mainScreen.children[1].children[3];
const lastController = mainScreen.children[1].children[4];
// Inputs
const nameInput = addScreen.children[2].children[0];
const dateInput = addScreen.children[2].children[1];
// Id counter for local storage
let idCounter;
window.onload = () => {
    if(localStorage.getItem("ID") === null) {
        idCounter = 0;
        localStorage.setItem("ID", idCounter);
    }
    else {
        idCounter = Number(localStorage.getItem("ID"));
    }
}

// User click to start button
startButton.addEventListener('click', () => {
    startScreen.style.display = "none";
    mainScreen.style.animation = "nextSlide 0.4s";
    mainScreen.style.display = "flex";
    showData();
});

// User click to add button
addButton.addEventListener('click', () => {
    mainScreen.style.display = "none";
    addScreen.style.animation = "nextSlide 0.4s";
    addScreen.style.display = "flex";
});

// User click to cancel button
cancelButton.addEventListener('click', turnToMainScreen = () => {
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

// Function for validate inputs data
function validateData() {
    try {
        if(nameInput.value.length < 1 || nameInput.value.length > 30) {
            throw new Error("Invalid length of name. Length must be from 1 to 30 characters.");
        }
        if(dateInput.value.length !== 10) {
            throw new Error("Invalid format of date. Date must be like '31-12-2023'");
        }
        let date = dateInput.value.split("");
        if(date[2] !== "-" || date[5] !== "-") {
            throw new Error("Invalid format of date. Date must be like '31-12-2023'");
        }
        if(Number(date[0] + date[1]) < 1 || Number(date[0] + date[1]) > 31) {
            throw new Error("Invalid format of date. Date must be like '31-12-2023'. Value of day must be from 1 to 31");
        }
        if(Number(date[3] + date[4]) < 1 || Number(date[3] + date[4]) > 12) {
            throw new Error("Invalid format of date. Date must be like '31-12-2023'. Value of month must be from 1 to 12");
        }
        if(Number(date[6] + date[7] + date[8] + date[9]) < 1000 || Number(date[6] + date[7] + date[8] + date[9]) > 9999) {
            throw new Error("Invalid format of date. Date must be like '31-12-2023'. Value of year must be from 1000 to 9999");
        }
        // If we haven't errors return true
        return true;
    }
    catch(Error) {
        addScreen.children[3].children[0].innerHTML = Error;
        // If we have error return false
        return false;
    }
}

// Function "sleep"
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function for get id of todo-item to saving in local storage
function getId() {
    idCounter += 0.5;
    localStorage.setItem("ID", idCounter);
    return idCounter;
}

// Function for save data to local storage
function saveData(name, date, id, status) {
    const itemObj = {
        id: id,
        name: name,
        date: date,
        status: status
    }
    try {
        return localStorage.setItem(`todo-item-${id}`, JSON.stringify(itemObj)); 
    }
    catch(error) {
        if(error === QUOTA_EXCEEDED_ERR) {
            alert(error, "Local storage limit exceeded")
        }
        else {
            alert(error);
        }
    }
}

// Function for show data from local storage
function showData() {
    for(element in localStorage) {
        if(typeof localStorage.getItem(element) === "string") {
            const itemData = JSON.parse(localStorage.getItem(element));
            // if status of item = active
            if(itemData["status"] === "active") {
                const item = `<div class="todo-item">
                                <div class="todo-item-button">
                                    <button type="submit" class="button-complete">&#10004;</button>
                                </div>

                                <div class="todo-item-information">
                                    <span class="todo-item-name">${itemData["name"]}</span>
                                    <span class="todo-item-date">${itemData["date"]}</span>
                                    <span class="todo-item-id">${itemData["id"]}</span>
                                </div>

                                <div class="todo-item-button">
                                    <button type="submit" class="button-delete">×</button>
                                </div>
                            </div>`;
                mainScreen.children[2].children[0].innerHTML += item;
            }
            // if status of item = completed
            else if(itemData["status"] === "completed") {
                const item = `<div class="completed-item">
                                <div class="todo-item-button">
                                    <button type="submit" class="button-return">↻</button>
                                </div>

                                <div class="todo-item-information">
                                    <span class="todo-item-name">${itemData["name"]}</span>
                                    <span class="todo-item-date">${itemData["date"]}</span>
                                    <span class="todo-item-id">${itemData["id"]}</span>
                                </div>

                                <div class="todo-item-button">
                                    <button type="submit" class="button-delete">×</button>
                                </div>
                            </div>`;
                mainScreen.children[2].children[1].innerHTML += item;
            }
        }
    }
}

// Function for remove data from local storage
function removeData(id) {
    return localStorage.removeItem(`todo-item-${id}`);
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
firstController.addEventListener('click', async () => {
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
    // Delete data from local storage
    removeData(todoItems[0].children[1].children[2].innerHTML);
    // Get delete animation to element
    todoItems[0].style.animation = "deleteItem 0.4s";
    // "sleep" code on 0.4s
    await sleep(400);
    // Delete first element from to-do list
    return todoItems[0].remove();
});

// User click to "Last Controller"
lastController.addEventListener('click', async () => {
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
    // Delete data from local storage
    removeData(todoItems[todoItems.length-1].children[1].children[2].innerHTML);
    // Get delete animation to element
    todoItems[todoItems.length-1].style.animation = "deleteItem 0.4s";
    // "sleep" code on 0.4s
    await sleep(400);
    // Delete last element from to-do list
    return todoItems[todoItems.length-1].remove();
});

// User click to delete button or user click to complete button on todo-list
mainScreen.children[2].children[0].addEventListener('click', async (element) => {
    if(element.target.classList.contains("button-delete")) {
        // Delete data from local storage
        removeData(element.target.parentElement.parentElement.children[1].children[2].innerHTML);
        // Get delete animation to element
        element.target.parentElement.parentElement.style.animation = "deleteItem 0.4s";
        // "sleep" code on 0.4s
        await sleep(400);
        // Delete item
        return element.target.parentElement.parentElement.remove();
    }
    if(element.target.classList.contains("button-complete")) {
        // Change status of item in local storage
        saveData(element.target.parentElement.parentElement.children[1].children[0].innerHTML, element.target.parentElement.parentElement.children[1].children[1].innerHTML, element.target.parentElement.parentElement.children[1].children[2].innerHTML, "completed");
        // Create item
        const completedItem = ` <div class="completed-item">
                                    <div class="todo-item-button">
                                        <button type="submit" class="button-return">↻</button>
                                    </div>

                                    <div class="todo-item-information">
                                        <span class="todo-item-name">${element.target.parentElement.parentElement.children[1].children[0].innerHTML}</span>
                                        <span class="todo-item-date">${element.target.parentElement.parentElement.children[1].children[1].innerHTML}</span>
                                        <span class="todo-item-id">${element.target.parentElement.parentElement.children[1].children[2].innerHTML}</span>
                                    </div>

                                    <div class="todo-item-button">
                                        <button type="submit" class="button-delete">×</button>
                                    </div>
                                </div>`;
        // Get complete animation to element
        element.target.parentElement.parentElement.style.animation = "completeItem 0.4s";
        // "sleep" code on 0.4s
        await sleep(400);
        // Delete this item from todo list
        element.target.parentElement.parentElement.remove();
        // Return completed item to completed items
        return mainScreen.children[2].children[1].innerHTML += completedItem;
    }
});

// User click to delete button or return button on completed items
mainScreen.children[2].children[1].addEventListener('click', async (element) => {
    if(element.target.classList.contains("button-delete")) {
        // Delete data from local storage
        removeData(element.target.parentElement.parentElement.children[1].children[2].innerHTML);
        // Get delete animation to element
        element.target.parentElement.parentElement.style.animation = "deleteItem 0.4s";
        // "sleep" code on 0.4s
        await sleep(400);
        // Delete item
        return element.target.parentElement.parentElement.remove();
    }
    if(element.target.classList.contains("button-return")) {
        // Change status of item in local storage
        saveData(element.target.parentElement.parentElement.children[1].children[0].innerHTML, element.target.parentElement.parentElement.children[1].children[1].innerHTML, element.target.parentElement.parentElement.children[1].children[2].innerHTML, "active");
        // Create item
        const todoItem = ` <div class="todo-item">
                                    <div class="todo-item-button">
                                        <button type="submit" class="button-complete">&#10004;</button>
                                    </div>

                                    <div class="todo-item-information">
                                        <span class="todo-item-name">${element.target.parentElement.parentElement.children[1].children[0].innerHTML}</span>
                                        <span class="todo-item-date">${element.target.parentElement.parentElement.children[1].children[1].innerHTML}</span>
                                        <span class="todo-item-id">${element.target.parentElement.parentElement.children[1].children[2].innerHTML}</span>
                                    </div>

                                    <div class="todo-item-button">
                                        <button type="submit" class="button-delete">×</button>
                                    </div>
                                </div>`;
        // Get complete animation to element
        element.target.parentElement.parentElement.style.animation = "completeItem 0.4s";
        // "sleep" code on 0.4s
        await sleep(400);
        // Delete this item from todo list
        element.target.parentElement.parentElement.remove();
        // Return completed item to completed items
        return mainScreen.children[2].children[0].innerHTML += todoItem;
    }
});

// User click to apply button
applyButton.addEventListener('click', () => {
    // If we haven't errors
    if(validateData()) {
        // Create new item with name and date from inputs
        const newItem = `<div class="todo-item">
                            <div class="todo-item-button">
                                <button type="submit" class="button-complete">&#10004;</button>
                            </div>

                            <div class="todo-item-information">
                                <span class="todo-item-name">${nameInput.value}</span>
                                <span class="todo-item-date">${dateInput.value}</span>
                                <span class="todo-item-id">${getId() + 0.5}</span>
                            </div>

                            <div class="todo-item-button">
                                <button type="submit" class="button-delete">×</button>
                            </div>
                        </div>`;
        // Save data to local storage
        saveData(nameInput.value, dateInput.value, getId(), "active");
        // Clear values of inputs
        nameInput.value = "";
        dateInput.value = "";
        // Turn to main screen
        turnToMainScreen();
        // Return new item to todo list
        mainScreen.children[2].children[0].innerHTML += newItem;
    }
});