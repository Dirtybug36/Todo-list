// Model
//if localstorage has a todos array then use it
//otherwise use the default array
let todos;
//retrieve localstorage
const savedTodos = JSON.parse(localStorage.getItem("todos"));
//check of its an array
if (Array.isArray(savedTodos)) {
  todos = savedTodos;
} else {
  todos = [
    {
      title: "Get groceries",
      dueDate: "2021-10-04",
      id: "id1",
    },
    {
      title: "Wash car",
      dueDate: "2021-02-03",
      id: "id2",
    },
    {
      title: "Make dinner",
      dueDate: "2021-03-04",
      id: "id3",
    },
  ];
}

// Creates a todo
function createTodo(title, dueDate) {
  const id = "" + new Date().getTime();

  todos.push({
    title: title,
    dueDate: dueDate,
    id: id,
  });

  saveTodos();
}

// Deletes a todo
function removeTodo(idToDelete) {
  todos = todos.filter(function (todo) {
    // If the id of this todo matches idToDelete, return false
    // For everything else, return true
    if (todo.id === idToDelete) {
      return false;
    } else {
      return true;
    }
  });
  saveTodos();
}
function saveTodos() {
  //localStorage.setItem helps us to retrieve our data from the local storage
  //Json.stringify will change our objects to strings !imp
  localStorage.setItem("todos", JSON.stringify(todos));
}

function toggleTodo(todoId, checked) {
  todos.forEach(function (todo) {
    if (todo.id === todoId) {
      todo.isDone = checked;
    }
  });
}

// Controller
function addTodo() {
  const textbox = document.getElementById("todo-title");
  const title = textbox.value;

  const datePicker = document.getElementById("date-picker");
  const dueDate = datePicker.value;

  createTodo(title, dueDate);
  render();
}

function deleteTodo(event) {
  const deleteButton = event.target;
  const idToDelete = deleteButton.id;

  removeTodo(idToDelete);
  render();
}

function checkTodo(event) {
  const checkbox = event.target;

  const todoId = checkbox.dataset.todoId;
  const checked = checkbox.checked;

  toggleTodo(todoId, checked);
  render();
}

// View
function render() {
  // reset our list
  document.getElementById("todo-list").innerHTML = "";

  todos.forEach(function (todo) {
    const element = document.createElement("div");
    element.innerText = todo.title + " " + todo.dueDate;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onchange = checkTodo;
    checkbox.dataset.todoId = todo.id;
    if (todo.isDone === true) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
    element.prepend(checkbox);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.style = "margin-left: 12px";
    deleteButton.onclick = deleteTodo;
    deleteButton.id = todo.id;
    element.appendChild(deleteButton);

    const todoList = document.getElementById("todo-list");
    todoList.appendChild(element);
  });
}

render();
