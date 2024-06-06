const userTxt = document.querySelector("#userinput");
const list = document.querySelector(".todo-input ul");
const footer = document.querySelector(".footer");
const container = document.querySelector(".btnContainer");
const dltBtn = document.querySelector(".dltBtn");
let footerChildren;

let tasks = [];
let id = 0;
let activeTasksCount = 0;
let currentView = "all";

// add task
// function addTask() {

userTxt.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    if (!userTxt.value == "") {
      tasks.push({ id: id++, task: e.target.value.trim(), status: false });
      activeTasksCount++;
      renderTask(tasks);
    }
    console.log(tasks);
  }
});
// }

function getTaskArrayByView(taskArr, currentView) {
  let filteredArr = [];
  if (currentView === "all") {
    filteredArr = taskArr;
  } else {
    filteredArr = taskArr.filter((task) => {
      if (currentView === "active") {
        return task.status === false;
      } else if (currentView === "completed") {
        return task.status === true;
      }
    });
  }

  return filteredArr;
}

function updateTabSelection() {
    const footerChildrenArr = Array.from(footerChildren);
   
    footerChildrenArr.forEach(node => {
        const { filter } = node.dataset;
        if (filter === currentView) {
            node.classList.add("selected");
        } else {
            node.classList.remove("selected");
        }
    });
}

function renderTask(tasks) {
  list.innerHTML = "";

  const taskArrByView = getTaskArrayByView(tasks, currentView);

  taskArrByView.forEach((i) => {
    const { task, status } = i;

    if (task !== "") {
      const textDecoration = i.status ? "line-through" : "none";

      const listItem = document.createElement("li");
      listItem.innerHTML = `<li style="text-decoration:${textDecoration}"><label class="container1">
            <input type="checkbox" onclick="completedTask(${i.id})"  ${
        status ? "checked" : ""
      }/>
            <span class="checkmark"></span> ${task} <button class="dltBtn" onClick="deleteTask(${
        i.id
      })" >x</button></li>`;
      list.appendChild(listItem);

      userTxt.value = "";
      footer.innerHTML = `
            <div class="div1" style="padding:13px">
            <p>${activeTasksCount} items left</p>
            </div>
            <div class="div2" style="padding:13px">
                <button data-filter="all" onclick="displayAll()">All</button>
                <button data-filter="active" onclick="displayActive()">Active</button>
                <button data-filter="completed" onclick="displayCompleted()">Completed</button>
            </div>
            <div class="div3" style="padding:13px">
            <button onclick="removeCompleted()">Clear Completed</button>
        </div>`;
      container.appendChild(footer);

      footerChildren = document.querySelector(".div2").children;
    }
  });

  updateTabSelection();
}
function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    if (!tasks[index].status) {
      activeTasksCount--;
    }
    tasks.splice(index, 1);
    renderTask(tasks);
  }
}
function completedTask(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.status = !task.status;
    if (task.status) {
      activeTasksCount--;
    } else {
      activeTasksCount++;
    }
    renderTask(tasks);
  }
}

function displayAll() {
  currentView = "all";
  renderTask(tasks);
}

function displayActive() {
  currentView = "active";

  let activeArr = [];
  tasks.forEach((i) => {
    if (i.status == false) {
      return activeArr.push(i);
    }
  });
  renderTask(activeArr);
}

function displayCompleted() {
  currentView = "completed";
  let completedArr = [];
  tasks.forEach((i) => {
    if (i.status == true) {
      completedArr.push(i);
    }
  });

  renderTask(completedArr);
}

function removeCompleted() {
  tasks = tasks.filter((task) => !task.status);
  if (currentView === "active") {
    console.log(currentView);
    displayActive(tasks);
  }
  if (currentView === "completed") {
    console.log(currentView);
    displayCompleted();
  }
  // renderTask(tasks);
}
function selectAll() {
  const allCompleted = tasks.every((task) => task.status);
  tasks.forEach((task) => {
    task.status = !allCompleted;
  });
  if (allCompleted) {
    activeTasksCount = tasks.length;
  } else {
    activeTasksCount = 0;
  }
  renderTask(tasks);
}

// addTask();
