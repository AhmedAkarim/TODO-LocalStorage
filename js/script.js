let taskList = document.getElementById("tasks-list");
let inputTask = document.getElementById("input-task");
let add_Task = document.getElementById("add-task");

loadTasks()

function addTask () {
    
    let task = inputTask.value.trim();
    
    if(task) {
        
        // Adding the whole task
        createTask(task);
        
        
        inputTask.value = "";

        saveTasks();
        
        
    } else {
        alert("Please enter a task")
    }
    
}

add_Task.addEventListener("click", addTask);

function createTask(task) {
    // create Li element
        let li = document.createElement("li");
        li.classList.add("flex", "items-center", "gap-3", "bg-[#131e2f]", "py-3", "px-4", "rounded-full")

        // create checkbox  
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("w-5", "h-5", "grow-1", "checked:accent-[#517bfa]");
        li.appendChild(checkbox);


        // create p element for displaying text
        let p = document.createElement("p");
        p.classList.add("grow-28");
        p.textContent = task;
        li.appendChild(p);

        // adding the delete icon
        let delIcon = document.createElement("ion-icon");
        delIcon.classList.add("grow-1", "text-2xl", "text-[#d8ecff]", "hover:text-blue-400")
        li.appendChild(delIcon);
        delIcon.setAttribute("name", "trash");

        // deleteLogic
        delIcon.addEventListener("click", function() {
            li.remove();
            saveTasks();
        });

        taskList.appendChild(li);

        checkbox.addEventListener('change', () => {
            // Use classList.toggle to add/remove the class based on checkbox state
            p.classList.toggle("line-through", checkbox.checked);
        });
}

function saveTasks() {

    let tasks = [];
    let allTasksList = document.getElementsByTagName("li")

    for (let i = 0; i < allTasksList.length; i++) {
        const item = allTasksList[i];

        tasks.push(item.textContent.trim())
        
    }

    localStorage.setItem("tasks", JSON.stringify(tasks))

}

function loadTasks() {

    const tasks = JSON.parse(localStorage.getItem("tasks"))

    if(tasks) {
        tasks.forEach(createTask);
    }

}