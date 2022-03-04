var nonImportantClass = "far fa-star";
var importantClass = "Fas fa-star";
var isImportant = false;
var isFormVisible = true;

function toggleForm(){
    if(isFormVisible){
        //hide
        isFormVisible =false;
        $("#form").hide();
    }
    else {
        //show
        isFormVisible =true;
        $("#form").show();
    }
}

function toggleImportant(){
    console.log("icon-clicked");

    if(isImportant){
        //non important
        isImportant = false;
        $("#iImportant").removeClass(importantClass);
        $("#iImportant").addClass(nonImportantClass);
    }
    else{
        //important
        $("#iImportant").removeClass(nonImportantClass);
        $("#iImportant").addClass(importantClass);
        isImportant = true;
    }
}

function saveTask(){
    console.log("Task Saved");

    let title= $("#txtTitle").val();
    let dueDate= $("#txtDueDate").val();
    let participants= $("#txtParticipants").val();
    let location= $("#txtLocation").val();
    let notes= $("#txtNotes").val();
    let category= $("#txtCategory").val();
    let color= $("#txtColor").val();

    if(title.length <4){
        alert("Title should be at least 4 chars long");
        return;
    }
    if(!dueDate){
        alert("DueDate is required");
        return;
    }
    let taskObject = new Task(title,dueDate,participants,location,notes,category,color,isImportant);
    console.log(taskObject);
    //json string
    let dataStr= JSON.stringify(taskObject);
        console.log(dataStr);
    //save task http request
    $.ajax({
        type:"POST",
        url:"https://fsdiapi.azurewebsites.net/api/tasks",
        data: dataStr,
        contentType: "application/json",

        success: function(data){
            console.log("Save res", data);
        },
        error: function(error){
            console.log("Save failed", error);
        }
    });

    //display
    displayTask(taskObject);
    //clear form
    clearForm();
}

function clearForm(){
    $("#txtTitle").val("");
    $("#txtDueDate").val("");
    $("#txtParticipants").val("");
    $("#txtLocation").val("");
    $("#txtNotes").val("");
    $("#txtCategory").val("");
    $("#txtColor").val("#000000");
}

function displayTask(taskObject){
    //create the syntax and append an element to the screen
    let syntax=`<div class="task-object">
        <h3 class="task-title">${taskObject.title} </h3>

        <label class="due-date">${taskObject.dueDate} </label>
        <label class="people">${taskObject.participants} </label>
        <label class="location">${taskObject.location} </label>

        <p class="notes">${taskObject.notes} </p>

        <lable class"category">${taskObject.category} </label>
    
        <button onclick="deleteTask(${taskObject._id}) " class="btn btn-sm btn-danger">Remove</button>
    </div>`;
    $("#task-list").append(syntax);
}

function deleteTask(id){
    console.log("deleting task",id);
    $("#"+ id).remove();
    //http delete request with the ID
}

//delete https://fsdiapi.azurewebsites.net/api/tasks/clear/<name>
    function clearData(){
        $ajax({
            type: "DELETE",
            url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/MairaCh26",
            success: () => {
                console.log("Data cleared");
                $("#task-list").html("");
            },
            error: (details) => {
                console.log("Clear failed", details);
            }    
        })
    }

function retrieveTask(){
    //https://fsdiapi.azurewebsites.net/api/tasks
    //create a GET request
    $.ajax({
        type:"GET",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        success: function(data){
            let list = JSON.parse(data); //from string data to object/array
            //for loop that travels the list and prints every task
            for(let i=0; i< list.length; i++){
                let taskObject = list[i];
                //check for my task and display only mine
               if (taskObject.name==="MairaCh26"){
                   displayTask(taskObject);
               }
            }
        },
        error: function(error){
            console.log("Retrieve Failed", error);
        }        

    });
}
function init(){
    console.log("Task manager");

    // events
    $("#iImportant").click(toggleImportant);
    //load data
    $("#btnToggleForm").click(toggleForm);
    $("#saveTask").click(saveTask)
    $("#btnSave").click(saveTask);
    //load data
    retrieveTask();
    $("#btnDeleteTask").click(clearData)
}
window.onload = init;


//create a button an if statment 















//NOTES 

// function init(){
//     console.log("Task manager");

//     //click for priority 
//     //$() find me an elament by ID, Class, or Tag
//     $("#iImportant").click(function(){
//         console.log("icon-clicked");
//     });
// }


