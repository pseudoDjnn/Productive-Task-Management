// var buttonEl = document.querySelector("#save-task");
// let formEl = document.querySelector("#task-form");
// let tasksToDoEl = document.querySelector("#tasks-to-do");

// let createTaskHandler = function (event) {
//   event.preventDefault();

//   let listItemEl = document.createElement("li");
//   listItemEl.className = "task-item";
//   listItemEl.textContent = "This is a new task";
//   tasksToDoEl.appendChild(listItemEl);
// };

// // buttonEl.addEventListener("click", createTaskHandler);
// formEl.addEventListener("submit", createTaskHandler);

// console.log(event);

var formEl = document.querySelector("#task-form");
console.log("🚀 ~ file: script.js ~ line 20 ~ formEl", formEl);
var tasksToDoEl = document.querySelector("#tasks-to-do");
console.log("🚀 ~ file: script.js ~ line 22 ~ tasksToDoEl", tasksToDoEl);

var createTaskHandler = function (event) {
  event.preventDefault();
  // event.preventDefault();

  // var taskNameInput = document.querySelector("input[name='task-name']");
  // console.log(taskNameInput);

  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "This is a new task.";
  tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);
// formEl.addEventListener("submit", createTaskHandler);
