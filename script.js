
let todoList = [];

const todoListElement = document.querySelector("#myUL");
const addButton = document.getElementById('add_button')
const inputField = document.getElementById('myInput')

addButton.addEventListener("click", addTodo);


function addTodo() {
  if (inputField.value == "") {
    alert("You did not enter any item");
  } else {
    const todoObject = {
      id: todoList.length,
      todoText: inputField.value,
      completeDone: false,
    };

    todoList.push(todoObject);
    render();
  }
}

function complete(y) {
  const selectedTodoIndex = todoList.findIndex((item) => item.id == y);
  todoList[selectedTodoIndex].completeDone = !todoList[selectedTodoIndex].completeDone
  render();
}


function deleteItem(x) {
 // todoList.splice(todoList.findIndex((item) => item.id == x),1);
  todoList = [...todoList.filter(item => item.id !== Number(x))]
  render();
}

function render() {
  todoListElement.innerHTML = "";
  inputField.value = "";

  todoList.forEach((item) => {
    const listElement = document.createElement("li");
    const delBtn = document.createElement("i");

    listElement.innerHTML = item.todoText;
    listElement.setAttribute("data-id", item.id);

    delBtn.setAttribute("data-id", item.id);
    delBtn.classList.add("far");
    delBtn.classList.add("fa-trash-alt");

    if (item.completeDone) {
      listElement.classList.add("checked");
    }

    listElement.addEventListener("click", function (e) {
      complete(e.target.getAttribute("data-id"));
    });

    delBtn.addEventListener("click", function (e) {
      e.stopPropagation()
      deleteItem(e.target.getAttribute("data-id"));
    });

    listElement.appendChild(delBtn);
    todoListElement.appendChild(listElement);
  });
}