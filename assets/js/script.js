let taskIdCounter = 0;

let pageContentEl = document.querySelector("#page-content");
let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let tasksInProgressEl = document.querySelector("#tasks-in-progress");
let tasksCompletedEl = document.querySelector("#tasks-completed");

let tasks = [];

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

  let isEdit = formEl.hasAttribute("data-task-id");
  // console.log(isEdit);

  // has data attribute, get id
  if (isEdit) {
    let taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
    // no data attribute, so create  as normal
  } else {
    // package data into object
    let taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do",
    };
    console.log(taskDataObj);
    console.log(taskDataObj.status);
    createTaskEl(taskDataObj);
  }
};

let completeEditTask = function (taskName, taskType, taskId) {
  // console.log(taskName, taskType, taskId);

  // find the matching task
  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // sets new value
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  // debugger;
  // loop through all tasks and task object with new content
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  }

  saveTasks();

  // debugger;
  alert("Task Updated!");

  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
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

  taskDataObj.id = taskIdCounter;
  tasks.push(taskDataObj);

  saveTasks();

  taskIdCounter++;
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
  statusSelectEl.className = "select-status";
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

let taskStatusChangeHandler = function (event) {
  // get item id
  let taskId = event.target.getAttribute("data-task-id");

  // get selected option's value and convert to lower case
  let statusValue = event.target.value.toLowerCase();

  // find pareent element based on id
  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

  // updated tasks in task array
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }
  console.log(tasks);
  saveTasks();
};

let taskButtonHandler = function (event) {
  // console.log(event.target);

  // get target element form event
  let targetEl = event.target;

  // updated edit button click
  if (targetEl.matches(".edit-btn")) {
    let taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } else if (targetEl.matches(".delete-btn")) {
    // console.log("clicked delete");

    // getting the task id
    let taskId = targetEl.getAttribute("data-task-id");
    console.log(taskId);
    deleteTask(taskId);
  }
};

let editTask = function (taskId) {
  console.log("editing #" + taskId);

  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  console.log(taskSelected);

  let taskName = taskSelected.querySelector("h3.task-name").textContent;
  // console.log(taskName);
  document.querySelector("input[name='task-name']").value = taskName;

  let taskType = taskSelected.querySelector("span.task-type").textContent;
  // console.log(taskType);
  document.querySelector("select[name='task-type']").value = taskType;

  document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-task-id", taskId);
};

let deleteTask = function (taskId) {
  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();

  // create new empty array
  let updatedTaskArr = [];

  // loop through tasks
  for (let i = 0; i < tasks.length; i++) {
    // if value is not a match then push to new array
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }
  tasks = updatedTaskArr;
  saveTasks();
};

let saveTasks = function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
