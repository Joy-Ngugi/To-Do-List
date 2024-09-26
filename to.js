const taskInput=document.getElementById("task-input");
const  addTaskBtn =document.getElementById("addTaskButton");
const taskList =document.getElementById("taskList");
const darkModeToggle = document.getElementById('darkModeToggle');
const dueDateInput = document.getElementById("date");
const priority = document.getElementById("priority");
//dark mode/light mode
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode')
      ? 'Switch to Light Mode'
      : 'Switch to Dark Mode';
  });
  

addTaskBtn.addEventListener("click", function(){
    const taskText = taskInput.value.trim();
    const dueDateValue = dueDateInput.value;
    if (taskText ===""|| dueDateValue===""){
        alert('Please enter a task and due date');
                return;
            }
            const task = {
                description: taskText,
                priority: priority.value,
                dueDate: new Date(dueDateValue),
                id: Date.now(),
                isCompleted: false
            };
            displayTask(task);
            taskInput.value = "";
            dueDateInput.value = "";
        });
        function displayTask(task) {
            const li = document.createElement('li');
            li.setAttribute('data-id', task.id);
            li.innerHTML = `
                <strong>${task.description}</strong>
                <span>( ${task.priority} priority, Due: ${task.dueDate.toDateString()})</span>
                <button onclick="removeTask(${task.id})">Remove</button>
            `;
            taskList.appendChild(li);
            scheduleReminder(task);
        }
        function removeTask(id) {
            const taskItem = document.querySelector(`[data-id="${id}"]`);
            if (taskItem) {
                taskItem.remove();
            }
        }

taskList.addEventListener("dblclick", function(event) {
    if (event.target.tagName.toLowerCase() === "li") {
        let currentText = event.target.textContent;
        let newText = prompt("Edit your task:", currentText);
        if (newText.trim() !== "") {
            event.target.textContent = newText.trim();
        }
    }
});