var taskMarked = function(idOfTask, technicianName, typeOfTask, description, dateOfTask, isDone, durationOfTask, locationTask) {
	
	this.idOfTask = idOfTask;
	this.technicianName = technicianName;
	this.typeOfTask = typeOfTask;
	this.description = description;
	this.dateOfTask = dateOfTask;
	this.isDone = isDone;
	this.durationOfTask = durationOfTask;
	this.locationTask = locationTask;

}

$(function() {
	
	$('#dateof-task').datetimepicker({lang:'es', format:'d/m/Y', timepicker:false});	
	$('#timeof-task').datetimepicker({ datepicker:false,	format:'H:i'});	

});

// Evita que se quede el datetimepicker en primer plano al cerrar el panel
$("#add-newtask-panel").panel({
	beforeclose : function(event, ui) {				
		$("#dateof-task").datetimepicker("hide");		
		$('#timeof-task').datetimepicker("hide");	
	}
});

// Fill the SELECT element with the names of technicians
$("#admin-page").on("pagebeforeshow",function() {

	$("#select-choice-name").empty();

	var longitud = arrayUsers.length;	

	for ( var i = 0; i < longitud; i++) {

		var nameTech = arrayUsers[i];
		$("#select-choice-name").append('<option value="' + i + '">' +nameTech + '</option>');
	}

	$("#select-choice-name").selectmenu('refresh');
	
});

$(document).on("pageshow", "#admin-page", function(event) {
	
	recuperateTasksOfTech();
});

// If SELECT with the name changes updates the tasks
$(document).on('change', '#select-choice-name', function() {
	
	recuperateTasksOfTech();
});

//function recuperateTasksOfTech(nameOfTech) {
function recuperateTasksOfTech() {
	var nameOfTech = $('#select-choice-name').find("option:selected").text();

	if (hasWhiteSpace(nameOfTech)) {
		nameOfTech = nameOfTech.replace(/\s/g, "");		
	}

	var arr = window['arrayTasks' + nameOfTech];// to accesss to a variable with a variable name												
	var lengthOfarr = arr.length;	

	$("#listTasksTech").empty(); 

	for ( var i = 0; i < lengthOfarr; i++) {

		var tarea = arr[i];
		if (hasWhiteSpace(tarea)) {
			tarea = tarea.replace(/\s/g, "");
		}

		$("#listTasksTech").append('<input type="checkbox" class="ui-icon-arrow-r" name="cb-' + tarea + '" id="cb-' + i + '" value="' + nameOfTech + '"/><label id="'+tarea+nameOfTech+'" for="cb-'+ i + '">' + arr[i] + '</label>');

	}

	$("#listTasksTech").trigger("create");
	$('#listTasksTech input').click(editTaskAttrib);

	markTasksCached();

}

// It marks tasks from the local storage
function markTasksCached(){	
	
	
	if (!window.localStorage["listOfallTasks"]) {				
		
		$('#listTasksTech input').prop('checked',false).checkboxradio('refresh');		

	}
	else{
		
		if(window.localStorage.getArray("listOfallTasks").length>0){
			
			$('#listTasksTech input').prop('checked',false).prop('disabled',false).checkboxradio('refresh');
			
			var cadena1 = $("#select-choice-name option:selected").text();
		
			var longitud = window.localStorage.getArray("listOfallTasks").length;
			var contador = 0;
			var arrayAux =  new Array();
			for(var i=0;i<longitud;i++){
				
				var cadena2 = window.localStorage.getArray("listOfallTasks")[i].technicianName;
				if(cadena1==cadena2){
					var selectboxvalue = window.localStorage.getArray("listOfallTasks")[i].typeOfTask;
					if (hasWhiteSpace(selectboxvalue)) {
						selectboxvalue = selectboxvalue.replace(/\s/g, "");
					}
					
					$("#listTasksTech input[name=cb-"+selectboxvalue+"]").prop('checked',true).checkboxradio('refresh');	
		
				}
				
			}			
		}
		else{
			
			$('#listTasksTech input').prop('checked',false).checkboxradio('refresh');	


		}		
	}		
}

function editTaskAttrib() {	
				
	var nameAttr = $(this).attr("name");
	var taskType = nameAttr.substring(3);
	var nameComplete = $("#select-choice-name option:selected").text();
	var nameShort = nameComplete;
	
	if (hasWhiteSpace(nameShort)) {
		nameShort = nameShort.replace(/\s/g, "");		
	}
	
	var labelText = $("#"+taskType+nameShort).text();
	
	$("#infoTask").val(labelText);
	
	if (!window.localStorage["listOfallTasks"]) {		
		
		console.log("Nothing saved yet");
		var todayDate = new Date(new Date().getTime() + (24* 60 * 60 * 1000));
		todayDate = todayDate.getDate() + "/"+  (parseInt(todayDate.getMonth()) + 1)+ "/" + todayDate.getFullYear();
		$("#dateof-task").val(todayDate);
		$("#textarea-description").val("");
		$("#timeof-task").val("02:00");

	}
	else{
		
		if(isTaskStored(nameComplete,labelText)){			
			console.log("ESTA REGISTRADA");
			getTheTaskInformation(nameComplete,labelText);
			
		}	
		else{
			var todayDate = new Date(new Date().getTime() + (24* 60 * 60 * 1000));
			todayDate = todayDate.getDate() + "/"+  (parseInt(todayDate.getMonth()) + 1)+ "/" + todayDate.getFullYear();
			$("#dateof-task").val(todayDate);
			$("#textarea-description").val("");
			$("#timeof-task").val("02:00");
			$("#slider-flip-done").val('off').slider('refresh');

		}
	}
	
	$("#add-newtask-panel").panel("open");

}

$("#boton-marcar").on("click", function() {	
	
	var taskNameComplete = $("#infoTask").val();
	var nameOfPerson = $("#select-choice-name option:selected").text();
	var taskNameShort = taskNameComplete;
	if (hasWhiteSpace(taskNameShort)) {
		taskNameShort  = taskNameShort.replace(/\s/g, "");		
	}
	
	// Id for the first task
	var idTask = 0;	
	var dateOfTask = $("#dateof-task").val();	
	var durationOfTask = $("#timeof-task").val();
	var description = $("#textarea-description").val();
	
	if ($('#slider-flip-done option:selected').val() == "on") {
		isDone = "Yes";
	}
	else{
		isDone = "No";
	}
	
	var taskSelected = new taskMarked(idTask, nameOfPerson,	taskNameComplete, description, dateOfTask, isDone, durationOfTask, "locationTask");
	
	if (!window.localStorage["listOfallTasks"]) {
		
		var taskArray = new Array();
		taskArray.push(taskSelected);
		window.localStorage.setArray("listOfallTasks", taskArray);

	} else {		
		

		if(!isTaskStored(nameOfPerson,taskNameComplete)){			
			
			saveInLocalstorage(taskSelected);
		}
		else{
			setTheTaskInformation(taskSelected);
			console.log("INFORMATION EDITED");
		}		
		
	}
	
	$("#listTasksTech input[name=cb-" + taskNameShort + "]").prop('checked', true).checkboxradio('refresh');
});

$("#boton-desmarcar").on("click", function() {
	
	var taskNameComplete = $("#infoTask").val();
	var nameOfPerson = $("#select-choice-name option:selected").text();
	var taskNameShort = taskNameComplete;
	if (hasWhiteSpace(taskNameShort)) {
		taskNameShort  = taskNameShort.replace(/\s/g, "");		
	}
	
	if (!window.localStorage["listOfallTasks"]) {		
		
		console.log("Nothing to removed");

	} else {		

		if(isTaskStored(nameOfPerson,taskNameComplete)){
			
			removeFromLocalsotrage(nameOfPerson,taskNameComplete);
		}
		
	}
	
	$("#listTasksTech input[name=cb-" + taskNameShort + "]").prop('checked', false).checkboxradio('refresh');

});

function isTaskStored(nameOfPerson,taskName){
	
	var longLocalStorage = window.localStorage.getArray("listOfallTasks").length;	

	var cont = 0;
	var isStored= false;
	
	while((!isStored)&&(cont<longLocalStorage)){			

		if((nameOfPerson == window.localStorage.getArray("listOfallTasks")[cont].technicianName)&&(taskName ==  window.localStorage.getArray("listOfallTasks")[cont].typeOfTask)){
			
			console.log("EXISTE");
			isStored = true;
		}
		else{
			cont++;
			
		}	
		
	}
	
	return isStored;
}

function saveInLocalstorage(taskSelected) {

	var longLocalStorage = window.localStorage.getArray("listOfallTasks").length;	
	
	var newArray = new Array();

	for ( var i = 0; i < longLocalStorage; i++) {

		newArray[i] = window.localStorage.getArray("listOfallTasks")[i];
	}
	
	var nuevoId;
	
	if(longLocalStorage==0){		
		nuevoId = 0;
	}
	else{		
		// The ID of the new task it will be the ID of the last plus one
		nuevoId = window.localStorage.getArray("listOfallTasks")[longLocalStorage - 1].idOfTask + 1;		
	}
	taskSelected.idOfTask = nuevoId;	

	newArray[nuevoId] = taskSelected;

	window.localStorage.deleteArray("listOfallTasks");

	window.localStorage.setArray("listOfallTasks", newArray);

}

function getTheTaskInformation(nameOfPerson,taskName){
	
	var longLocalStorage = window.localStorage.getArray("listOfallTasks").length;

	var cont = 0;
	var isFound= false;
	
	while((!isFound)&&(cont<longLocalStorage)){			

		if((nameOfPerson == window.localStorage.getArray("listOfallTasks")[cont].technicianName)&&(taskName ==  window.localStorage.getArray("listOfallTasks")[cont].typeOfTask)){			
			
			$("#dateof-task").val(window.localStorage.getArray("listOfallTasks")[cont].dateOfTask);
			$("#textarea-description").val(window.localStorage.getArray("listOfallTasks")[cont].description);
			$("#timeof-task").val(window.localStorage.getArray("listOfallTasks")[cont].durationOfTask);
			
			if (window.localStorage.getArray("listOfallTasks")[cont].isDone == "Yes") {
				$("#slider-flip-done").val('on').slider('refresh');
			}
			else{
				$("#slider-flip-done").val('off').slider('refresh');
			}
			
				
			isFound = true;
		}
		else{
			cont++;
			
		}	
		
	}
	
}

function setTheTaskInformation(taskSelected){
	

	var longLocalStorage = window.localStorage.getArray("listOfallTasks").length;
	
	var newArray = new Array();
	newArray = window.localStorage.getArray("listOfallTasks");

	var cont = 0;
	var isFound= false;
	
	while((!isFound)&&(cont<longLocalStorage)){	

		if((taskSelected.technicianName == window.localStorage.getArray("listOfallTasks")[cont].technicianName)&&(taskSelected.typeOfTask ==  window.localStorage.getArray("listOfallTasks")[cont].typeOfTask)){
			newArray.splice(cont,1);
			taskSelected.dateOfTask = $("#dateof-task").val();
			taskSelected.description = $("#textarea-description").val();
			taskSelected.durationOfTask = $("#timeof-task").val();
			if ($('#slider-flip-done option:selected').val() == "on") {
				taskSelected.isDone = "Yes";
			}
			else{
				taskSelected.isDone = "No";
			}
			
			newArray.push(taskSelected);
			isFound = true;
		}
		else{
			cont++;			
		}	
		
	}

	window.localStorage.deleteArray("listOfallTasks");

	window.localStorage.setArray("listOfallTasks", newArray);

	
}

function removeFromLocalsotrage(nameOfPerson,taskName) {

	var longLocalStorage = window.localStorage.getArray("listOfallTasks").length;
	
	var newArray = new Array();
	newArray = window.localStorage.getArray("listOfallTasks");

	var cont = 0;
	var borrado = false;
	
	while((!borrado)&&(cont<longLocalStorage)){	

		if((nameOfPerson == window.localStorage.getArray("listOfallTasks")[cont].technicianName)&&(taskName ==  window.localStorage.getArray("listOfallTasks")[cont].typeOfTask)){
			newArray.splice(cont,1);
			borrado = true;
		}
		else{
			cont++;			
		}	
		
	}

	window.localStorage.deleteArray("listOfallTasks");

	window.localStorage.setArray("listOfallTasks", newArray);

}


$("#set-task-done").click(function() {
	
	var taskTechnician = $("#task-technician").val();
	var taskType = $("#task-type-info").text();		
		
	if($("#task-marked-done").text()=="Is done: Yes"){
		
		
		setTaskStatus(taskTechnician, taskType, "No");
		$("#task-marked-done").text("Is done: No");
		$("#set-task-done").buttonMarkup({ theme: "a" });
		//$("#set-task-done").buttonMarkup({ icon: "check" });
		
		alert("Pending...");
	}
	else{
		setTaskStatus(taskTechnician, taskType, "Yes");		
		$("#task-marked-done").text("Is done: Yes");
		$("#set-task-done").buttonMarkup({ theme: "b" });
		//$("#set-task-done").buttonMarkup({ icon: "delete" });
		alert("Done!");
		
	}
	
});

function setTaskStatus(taskTechnician, taskType, newStatus){
	
	var longLocalStorage = window.localStorage.getArray("listOfallTasks").length;
	
	var newArray = new Array();
	newArray = window.localStorage.getArray("listOfallTasks");
	
	var cont = 0;
	var isFound= false;
	
	while((!isFound)&&(cont<longLocalStorage)){	

		if((taskTechnician == window.localStorage.getArray("listOfallTasks")[cont].technicianName)&&(taskType ==  window.localStorage.getArray("listOfallTasks")[cont].typeOfTask)){
						
			var id = window.localStorage.getArray("listOfallTasks")[cont].idOfTask;
			var taskDescription = window.localStorage.getArray("listOfallTasks")[cont].description;
			var dateTask =  window.localStorage.getArray("listOfallTasks")[cont].dateOfTask;
			var duration =  window.localStorage.getArray("listOfallTasks")[cont].durationOfTask;
			var location = window.localStorage.getArray("listOfallTasks")[cont].locationTask;			
			
			var taskSelected = new taskMarked(id, taskTechnician, taskType, taskDescription, dateTask, newStatus, duration, location);
			
			newArray.splice(cont,1);		
				
			newArray.push(taskSelected);
			isFound = true;
		}
		else{
			cont++;			
		}	
		
	}

	window.localStorage.deleteArray("listOfallTasks");

	window.localStorage.setArray("listOfallTasks", newArray);	
	
}

