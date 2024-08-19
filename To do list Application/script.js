document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("task-list");
    const addButton = document.getElementById("add");
    const taskModal = document.getElementById("task-modal");
    const modalOverlay = document.getElementById("task-modal-overlay");
    const taskInput = document.getElementById("task-input");
    const saveTaskButton = document.getElementById("save-task");

    // Load tasks from localStorage when the page loads
    loadTasksFromLocalStorage();

    // Open the modal to add a new task
    addButton.addEventListener("click", () => {
        taskModal.style.display = "block";
        modalOverlay.style.display = "block";
    });

    // Close the modal when clicking outside of it
    modalOverlay.addEventListener("click", () => {
        taskModal.style.display = "none";
        modalOverlay.style.display = "none";
    });

    // Save the task and add it to the list
    saveTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const taskItem = createTaskElement(taskText);
            taskList.appendChild(taskItem);
            saveTaskToLocalStorage(taskText);  // Save to localStorage

            // Clear input and close the modal
            taskInput.value = "";
            taskModal.style.display = "none";
            modalOverlay.style.display = "none";
        }
    });

    // Function to create a task element
    function createTaskElement(taskText) {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");

        // Create task content
        const taskContent = document.createElement("span");
        taskContent.textContent = taskText;

        // Create an edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-button");
        editButton.addEventListener("click", () => {
            // Edit functionality
            const newTaskText = prompt("Edit task:", taskContent.textContent);
            if (newTaskText !== null && newTaskText.trim() !== "") {
                taskContent.textContent = newTaskText;
                updateTaskInLocalStorage(taskText, newTaskText);
            }
        });

        // Create a delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            taskList.removeChild(taskItem);
            deleteTaskFromLocalStorage(taskText);  // Delete from localStorage
        });

        // Append elements to task item
        taskItem.appendChild(taskContent);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        return taskItem;
    }

    // Function to save task to localStorage
    function saveTaskToLocalStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to load tasks from localStorage
    function loadTasksFromLocalStorage() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(taskText => {
            const taskItem = createTaskElement(taskText);
            taskList.appendChild(taskItem);
        });
    }

    // Function to delete task from localStorage
    function deleteTaskFromLocalStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to update task in localStorage
    function updateTaskInLocalStorage(oldTaskText, newTaskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.map(task => task === oldTaskText ? newTaskText : task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
