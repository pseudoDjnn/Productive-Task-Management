let taskIdCounter = 0;

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

  // add id tag as custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

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

  let taskActionsEL = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEL);
  console.log(taskActionsEL);

  tasksToDoEl.appendChild(listItemEl);

  taskIdCounter++;
  // add item to list
  // tasksToDoEl.appendChild(listItemEl);
};

let createTaskActions = function (taskId) {
  let actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  let editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  // create cancel button
  let deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  let statusSelectEl = document.createElement("select");
  statusSelectEl.className = "status-select";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(statusSelectEl);

  let statusChoices = ["To Do", "In Progress", "Completed"];

  for (let i = 0; i < statusChoices.length; i++) {
    let statusOptionsEl = document.createElement("option");
    statusOptionsEl.textContent = statusChoices[i];
    statusOptionsEl.setAttribute("value", statusChoices[i]);

    // appending the selection
    statusSelectEl.appendChild(statusOptionsEl);
  }

  return actionContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);
