let taskList = document.getElementById("taskList")
let newTask = document.getElementById("newTask")
let btnAdd = document.getElementById("btnAdd")
let inputFilter = document.getElementById("filter")
let itemsTasks = document.getElementById("itemsTasks")
let btnClear = document.getElementById("btnClear")

let tasks = [];

function addTask(){
    tasks.push(newTask.value)
    newTask.value = ""
    // console.log(tasks)
}
btnAdd.addEventListener("click",addTask)