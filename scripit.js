

let errorMsg = document.getElementById("errorMsg")
let newTask = document.getElementById("newTask")
let btnAdd = document.getElementById("btnAdd")
let inputFilter = document.getElementById("filter")
let itemsTasks = document.getElementById("itemsTasks")
let btnClear = document.getElementById("btnClear")
let taskMinutes = document.getElementById("taskMinutes")
let tasks = [];
let editingIndex = null;
let alertSound = new Audio("sound/mixkit-signal-alert-771.wav")
function addTask(){
    let taskValue = newTask.value.trim()
    let minutesValue = taskMinutes.value.trim()
    if(taskValue===""){
        errorMsg.textContent = "Please write the task first!"
        return
    }
    if(minutesValue === "" || Number(minutesValue) <= 0){
        errorMsg.textContent = "Please enter valid minutes!"
        return
    }
    if (tasks.some(task => task.text === taskValue)){
        errorMsg.textContent = "This task already exists.!"
        return;
    }
     let minutes = Number(taskMinutes.value);
   tasks.push({ text: taskValue, minutes: minutes, completed: false, endTime: null, alerted: false });
   
    newTask.value = ""
    errorMsg.textContent = ""  
    // console.log(tasks)
    renderTaks()
    localStorage.setItem("tasks", JSON.stringify(tasks))
}
btnAdd.addEventListener("click",addTask)

function renderTaks(){
    itemsTasks.innerHTML = ""
    let activeIndex = tasks.findIndex(task=>task.completed === false)
    for(let i = 0;i<tasks.length;i++){
        if(tasks[i].text.includes(inputFilter.value)){
            
            let newLi = document.createElement("li")
            if(i === editingIndex){
                let editInput = document.createElement("input");
                editInput.type = "text";
                editInput.value = tasks[i].text
                newLi.appendChild(editInput)

                let btnSave = document.createElement("button")
                btnSave.textContent = "Save"
                btnSave.addEventListener("click",()=>{
                    tasks[i].text = editInput.value.trim()
                    editingIndex = null
                    renderTaks()
                    localStorage.setItem("tasks", JSON.stringify(tasks))
                })
                  newLi.appendChild(btnSave)
                   let btnCancel = document.createElement("button")
    btnCancel.textContent = "Cancel"
    btnCancel.addEventListener("click", () => {
        editingIndex = null
        renderTaks()
    })
    newLi.appendChild(btnCancel)
            }
            else if(tasks[i].completed){
                newLi.textContent = `${tasks[i].text} ✓ Completed`
                newLi.classList.add("completed")
                
            }
        else if(i === activeIndex){
            newLi.classList.add("active")
            if(tasks[i].endTime === null){
        tasks[i].endTime = Date.now() + tasks[i].minutes * 60 * 1000;
         
    }
    
    let remaninig = tasks[i].endTime - Date.now();
    if(remaninig <= 0){
        newLi.textContent = `${tasks[i].text} - Time's up!`
        if(tasks[i].alerted === false){
            alertSound.play()
            tasks[i].alerted = true
        }
    }else{
         let totalSeconds = Math.floor(remaninig/1000);
        let totalMin = Math.floor(totalSeconds/60);
        let seconds = totalSeconds%60;
        let timeText = `${totalMin}:${seconds.toString().padStart(2,"0")}`;
        newLi.textContent = `${tasks[i].text} - ${timeText}`
    }
}else{
     newLi.textContent = `${tasks[i].text} - Waiting...`
      newLi.classList.add("waiting")
}
        itemsTasks.appendChild(newLi)
        if(i !== editingIndex){

         let btnDelet = document.createElement("button")
        btnDelet.textContent = "Delete"
        newLi.appendChild(btnDelet)
        btnDelet.addEventListener("click",()=>{
            tasks.splice(i,1)
    alertSound.pause()
    alertSound.currentTime = 0
    renderTaks()
    localStorage.setItem("tasks", JSON.stringify(tasks))
        })
        let checkBox = document.createElement("input")
            checkBox.type = "checkbox"
            checkBox.checked = tasks[i].completed
            checkBox.addEventListener("change",()=>{
    tasks[i].completed = true;
    alertSound.pause()
    alertSound.currentTime = 0   
    errorMsg.textContent = "Great job   keep going my frinnnd";
    renderTaks()
    localStorage.setItem("tasks", JSON.stringify(tasks))
})
newLi.appendChild(checkBox)
let btnEdit = document.createElement("button")
btnEdit.textContent = "Edit"
btnEdit.addEventListener("click",()=>{
    editingIndex = i;
    renderTaks()
})
newLi.appendChild(btnEdit)
        }
    }
    }
}
function clearTasks (){
    tasks = []
    renderTaks()
    localStorage.setItem("tasks", JSON.stringify(tasks))
}
function handleEnter(event){
    if(event.key === "Enter"){
        addTask()
    }
}
newTask.addEventListener("keydown", handleEnter)
taskMinutes.addEventListener("keydown", handleEnter)
btnClear.addEventListener("click",clearTasks)
inputFilter.addEventListener("input",renderTaks)
let savedTasks = localStorage.getItem("tasks")
if(savedTasks){
    tasks = JSON.parse(savedTasks)
}
setInterval(()=>{
      if(editingIndex === null){
    renderTaks()
      }
},1000)

renderTaks()