// Get HTML elements
const addTaskButton = document.getElementById('add-task');
const modal = document.getElementById('modal');
const close = document.querySelector('.close');
const submitTaskButton = document.getElementById('submit-task');
const taskInput = document.getElementById('task');
const todoList = document.getElementById('todo-list');

// Get subtask modal elements
const subtaskModal = document.getElementById('subtask-modal');
const subtaskClose = document.querySelector('.subtask-close');
const subtaskSubmitButton = document.getElementById('submit-subtask');
const subtaskInput = document.getElementById('subtask');


// single cardRender
const singleCard = document.getElementById('singleCard');
const subSingleCard = document.getElementById('SubSingleCard');
function single() {
  if (singleCard.style.display === "block") {
    singleCard.style.display = "none"
  } else {
    singleCard.style.display = "block"
  }
}
singleCard.appendChild(subSingleCard);


// Function to create a new task card
function createTaskCard(task) {
  console.log(task)
  // Create a new task card
  const taskCard = document.createElement('div');
  taskCard.classList.add('task-card');

  // Create task name element and add to card
  const subtaskHaeading = document.getElementById('subTaskTitle');
  const taskName = document.createElement('h2');
  taskName.innerText = task;
  taskCard.appendChild(taskName);

  taskName.addEventListener("click", () => {
    single();
    subtaskHaeading.innerText = task;
    // console.log("hh");
    subSingleCard.appendChild(taskCard);
  });

  // Create a horizontal line and add to card
  const hr = document.createElement('hr');
  taskCard.appendChild(hr);

  // Create subtask list element and add to card
  const subtaskList = document.createElement('ul');
  taskCard.appendChild(subtaskList);

  // Create add subtask button element and add to card
  const addSubtaskButton = document.createElement('button');
  const imageAdd = document.createElement('img');
  imageAdd.src = 'Images/add.png';
  imageAdd.style.marginRight = '10px';
  addSubtaskButton.appendChild(imageAdd);

  const imageDel = document.createElement('button');
  imageDel.src = "Images/remove.png";
  imageDel.style.marginRight = '10px';
  addSubtaskButton.appendChild(imageDel);


  addSubtaskButton.classList.add('add-subtask');
  addSubtaskButton.addEventListener('click', () => {
    // Open subtask modal
    subtaskModal.style.display = 'block';
    // Call the createSubtaskItem function and pass the addSubtaskButton variable using a closure
    subtaskSubmitButton.onclick = function () {
      const subtask = subtaskInput.value;
      // if (subtask === '') {
      //   alert('Please enter a subtask.');
      //   return;
      // }
      createSubtaskItem(subtask, addSubtaskButton);
      subtaskInput.value = '';
      subtaskModal.style.display = 'none';
    };
  });

  taskCard.appendChild(addSubtaskButton);
  // Create delete button element and add to card
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-task');
  deleteButton.addEventListener('click', () => {
    taskCard.remove();
  });
  taskCard.appendChild(deleteButton);

  return taskCard;
}

function createSubtaskItem(subtask, addSubtaskButton) {
  // Create subtask item element and add to list
  const subtaskItem = document.createElement('ul');
  subtaskItem.innerText = subtask;
  subtaskItem.classList.add('subtask');

  // Create done button and add to subtask item
  const doneButton = document.createElement('button');
  doneButton.innerText = 'Done';
  doneButton.classList.add('done-button');
  doneButton.style.backgroundColor = 'blue';
  doneButton.style.borderRadius = '10px';
  doneButton.style.border = "none";
  doneButton.style.width = "60px";
  doneButton.style.height = "30px";
  doneButton.style.cursor = "pointer";
  doneButton.addEventListener('click', () => {
    subtaskItem.style.textDecoration = 'line-through';
    doneButton.parentNode.removeChild(doneButton);
  });
  subtaskItem.appendChild(doneButton);

  addSubtaskButton.parentNode.appendChild(subtaskItem);
}

// Update the subtask close event listener to clear the onclick handler for the subtask submit button
subtaskClose.addEventListener('click', () => {
  subtaskModal.style.display = 'none';
  subtaskSubmitButton.onclick = null;
});

// Update the window click event listener to clear the onclick handler for the subtask submit button
window.addEventListener('click', (event) => {
  if (event.target === subtaskModal) {
    subtaskModal.style.display = 'none';
    subtaskSubmitButton.onclick = null;
  }
});

// Add event listeners
addTaskButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

close.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

submitTaskButton.addEventListener('click', () => {
  const task = taskInput.value.trim();
  // if (task === '') {
  //   alert('Please enter a task.');
  //   return;
  // }
  // Create a new task card and add to the todo list
  const taskCard = createTaskCard(task);
  todoList.appendChild(taskCard);
  // Clear the input field and close the modal
  taskInput.value = '';
  modal.style.display = 'none';
});

// Update the click event listener for the subtask submit button to pass the addSubtaskButton parameter
subtaskSubmitButton.addEventListener('click', () => {
  const subtask = subtaskInput.value.trim();
  if (subtask === '') {
    alert('Please enter a subtask.');
    return;
  }

  // Create a new subtask item and add to the task card
  createSubtaskItem(subtask, addSubtaskButton);
  // Clear the input field and close the modal
  subtaskInput.value = '';
  subtaskModal.style.display = 'none';
});
