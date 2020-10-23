const addBtn = document.getElementById("add-item-btn");
const todoContent = document.getElementById("todo-content");
const completedContent = document.getElementById("completed-content");
const todoItems = Array.from(document.querySelectorAll(".todo__item"));
const todoItem = document.querySelector(".todo__item");
let addInput = document.getElementById("add-item-input");

let count = 0;

//trigger addBtn on enter
addInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    addBtn.click();
  }
});

addBtn.addEventListener("click", () => {
  addInput = document.getElementById("add-item-input");

  //check if input is not empty
  checkInput(addInput);

  //create todo items
  createItems();

  //add input value
  for (var i = 0; i < todoItems[count].childNodes.length; i++) {
    if (todoItems[count].childNodes[i].className === "todo__item-name") {
      todoItems[count].childNodes[i].innerText = addInput.value;
      todoItems[count].childNodes[i].nextElementSibling.value = addInput.value;
    }
  }

  //increase count of todo items
  count++;

  clearInput(addInput);

  //handle checkbox events
  handleCheckbox();
});

const checkInput = (input) => {
  if (!input.value) {
    throw Error("The field is required");
  }
};

const createItems = () => {
  const cloneTodoItem = addTodoDiv();
  todoItems.push(cloneTodoItem);
};

const clearInput = (input) => {
  input.value = "";
  input.focus();
};

const handleCheckbox = () => {
  //map checkboxes
  const checkboxes = todoItems.map((el) => {
    return el.childNodes[0];
  });

  checkboxes.forEach((el) => {
    el.addEventListener("click", (e) => {
      if (e.target.checked) {
        //move to completed
        completedContent.appendChild(e.target.parentNode);

        //change styles
        e.target.nextSibling.classList.add("todo__item-name--completed");
      } else {
        //move back to todo
        todoContent.appendChild(e.target.parentNode);

        //change styles
        e.target.nextSibling.classList.remove("todo__item-name--completed");
      }
    });
  });
};

const addTodoDiv = () => {
  //todo__item div
  const todoItemNew = document.createElement("DIV");
  todoItemNew.className = "todo__item";

  //input
  const checkboxNew = document.createElement("INPUT");
  checkboxNew.className = "todo__item-checkbox";
  checkboxNew.setAttribute("type", "checkbox");
  //h4
  const h4New = document.createElement("H4");
  h4New.className = "todo__item-name";
  //hidden input
  const inputNew = document.createElement("INPUT");
  inputNew.className = "todo__item-name todo__item-input hide";
  inputNew.setAttribute("type", "text");
  inputNew.onkeyup = (e) => {
    console.log(inputNew.value);
    h4New.innerHTML = inputNew.value;
  };
  //controls div
  const controlsNew = document.createElement("DIV");
  controlsNew.className = "controls";
  //edit button
  const editBtnNew = document.createElement("BUTTON");
  editBtnNew.className = "controls__edit";
  editBtnNew.innerHTML = "Edit";
  editBtnNew.onclick = (e) => {
    e.target.parentNode.previousElementSibling.classList.toggle("hide");
    e.target.parentNode.previousElementSibling.previousElementSibling.classList.toggle(
      "hide"
    );
    inputNew.focus();
  };

  //delete button
  const delBtnNew = document.createElement("BUTTON");
  delBtnNew.className = "controls__delete";
  delBtnNew.innerHTML = "Delete";
  delBtnNew.onclick = (e) => {
    e.target.parentNode.parentNode.remove();
    todoItems.splice(todoItems.indexOf(e.target.parentNode.parentNode), 1);
    count--;
  };

  //add buttons to controls
  controlsNew.appendChild(editBtnNew);
  controlsNew.appendChild(delBtnNew);

  //add children to div
  todoItemNew.appendChild(checkboxNew);
  todoItemNew.appendChild(h4New);
  todoItemNew.appendChild(inputNew);
  todoItemNew.appendChild(controlsNew);

  //add div to content
  todoContent.appendChild(todoItemNew);
  return todoItemNew;
};
