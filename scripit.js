let errorMsg = document.getElementById("errorMsg")
let newTask = document.getElementById("newTask")
let btnAdd = document.getElementById("btnAdd")
let inputFilter = document.getElementById("filter")
let itemsTasks = document.getElementById("itemsTasks")
let btnClear = document.getElementById("btnClear")

let tasks = [];

function addTask(){
    let taskValue = newTask.value.trim()
    if(taskValue===""){
        errorMsg.textContent = "Please write the task first!"
        return
    }
    if(tasks.includes(taskValue)){
        errorMsg.textContent = "This task already exists.!"
        return;
    }
   tasks.push(taskValue)
    newTask.value = ""
    errorMsg.textContent = ""  
    // console.log(tasks)
    renderTaks()
    localStorage.setItem("tasks", JSON.stringify(tasks))
}
btnAdd.addEventListener("click",addTask)

function renderTaks(){
    itemsTasks.innerHTML = ""
    for(let i = 0;i<tasks.length;i++){
        if(tasks[i].includes(inputFilter.value)){
            let newLi = document.createElement("li")
        newLi.textContent= tasks[i]
        itemsTasks.appendChild(newLi)
         let btnDelet = document.createElement("button")
        btnDelet.textContent = "Delete"
        newLi.appendChild(btnDelet)
        btnDelet.addEventListener("click",()=>{
            tasks.splice(i,1)
            renderTaks()
            localStorage.setItem("tasks", JSON.stringify(tasks))
        })
        }
        else{
            continue
        }
       
    }
}
function clearTasks (){
    tasks = []
    renderTaks()
    localStorage.setItem("tasks", JSON.stringify(tasks))
}
newTask.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        addTask()
    }
})
btnClear.addEventListener("click",clearTasks)
inputFilter.addEventListener("input",renderTaks)
let savedTasks = localStorage.getItem("tasks")
if(savedTasks){
    tasks = JSON.parse(savedTasks)
}
renderTaks()