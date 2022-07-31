let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");

let taskFormHandler = function (event) {
  event.preventDefault();

  let taskNameInput = document.querySelector("input[name='task-name']").value;
  let taskTypeInput = document.querySelector("select[name='task-type']").value;

  // forloop checking empty value
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the form!");
    return false;
  }
  formEl.reset();

  // package data into object
  let taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
  };

  createTaskEl(taskDataObj);
};

let createTaskEl = function (taskDataObj) {
  // create the list item
  let listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // create the div to hold info and add item
  let taskInfoEl = document.createElement("div");

  // attach name to div
  taskInfoEl.className = "task-info";

  // add content to div
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskDataObj.name +
    "</h3><span class='task-type'>" +
    taskDataObj.type +
    "</span>";
  listItemEl.appendChild(taskInfoEl);

  // add item to list
  tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", taskFormHandler);
