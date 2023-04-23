//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

let taskInput = document.getElementById("new-task");//Add a new task.
let addButton = document.getElementsByTagName("button")[0];//first button
let incompleteTaskHolder = document.getElementById("incompleted-tasks");//ul of #incompleteTasks
let completedTasksHolder = document.getElementById("completed-tasks");//completed-tasks


//New task list item
let createNewTaskElement = function(taskString){

    let listItem = document.createElement("li");
    listItem.className = "tasks__item";

    //input (checkbox)
    let checkBox = document.createElement("input");
    checkBox.className = "checkbox__item";
    //label
    let label = document.createElement("label");
    //input (text)
    let editInput = document.createElement("input");
    editInput.className = "tasks__text-input";
    //button.edit
    let editButton = document.createElement("button");
    editButton.className = "btn__edit";

    //button.delete
    let deleteButton = document.createElement("button");//delete button
    deleteButton.className = "btn__delete";
    let deleteButtonImg = document.createElement("img");//delete button image

    label.innerText = taskString;
    label.className = "tasks__label";

    checkBox.type = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Edit";

    deleteButtonImg.src = './remove.svg';
    deleteButton.appendChild(deleteButtonImg);


    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



let addTask = function(){
    console.log("Add Task...");

    if (!taskInput.value) return;
    let listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}


//Edit an existing task.
let editTask = function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    let listItem = this.parentNode;

    let editInput = listItem.querySelector('.tasks__text-input');
    let label = listItem.querySelector("label");
    let editBtn = listItem.querySelector(".btn__edit");
    let containsClass = listItem.classList.contains("edit-mode");
    //If class of the parent is .editmode
    if(containsClass){
        //switch to .editmode
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    }else{
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("edit-mode");
};


//Delete task.
let deleteTask = function(){
    console.log("Delete Task...");

    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);

}


//Mark task completed
let taskCompleted = function(){
    console.log("Complete Task...");

    let listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}

//Mark task incompleted
let taskIncomplete = function(){
    console.log("Incomplete Task...");

    let listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}


let ajaxRequest = function(){
    console.log("AJAX Request");
}

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


let bindTaskEvents = function(taskListItem, checkBoxEventHandler){
    console.log("bind list item events");

    let checkBox = taskListItem.querySelector(".checkbox__item");
    let editButton = taskListItem.querySelector(".btn__edit");
    let deleteButton = taskListItem.querySelector(".btn__delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
for (let i = 0; i < incompleteTaskHolder.children.length; i++){
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}
//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++){
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}


// Issues with usability don't get seen until they are in front of a human tester.
//!TODO prevent creation of empty tasks