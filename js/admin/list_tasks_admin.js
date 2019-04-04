function loadAllTasks(){
	
		if (!window.localStorage["listOfallTasks"]) {
			
			console.log("No existe el localstorage - listOfallTasks");
		}
	
		else{	
			
			
			var arrayObjetos = window.localStorage.getArray("listOfallTasks");
			var listado = "";
			
			
			if (arrayObjetos && arrayObjetos.length > 0) {					
		
				for ( var i = 0; i < arrayObjetos.length; i++) {
					
					var icontype ="";
					if(arrayObjetos[i].isDone =="No"){
						
						icontype ="clock";
					}
					else{
						icontype ="check";
					}
					
					var technicianName = arrayObjetos[i].technicianName;
					var typeOfTask = arrayObjetos[i].typeOfTask;											
					var dateOfTask = arrayObjetos[i].dateOfTask;
					var description = arrayObjetos[i].description;
					var durationOfTask = arrayObjetos[i].durationOfTask;
					
					var campoVacio= "";
					//dateOfTask = dateOfTask.getDate() + "/"+  (parseInt(dateOfTask.getMonth()) + 1)+ "/" + dateOfTask.getFullYear();
					
					var taskImagePath = typeOfTask;
					
					if(hasWhiteSpace(taskImagePath)){
						
						taskImagePath = taskImagePath.replace(/\s/g, "");		
						
					}
					
					var picturePath = "img/tasks/"+taskImagePath+".jpg";
					
			
					listado += "<li data-icon="+icontype+"><a href='javascript:gotoTask("+i+");'><img class='thumb' src='" + picturePath + "' /><h3>" + technicianName + ' ' + campoVacio + ''
					+ "</h3><p>" + typeOfTask + ' ' + campoVacio + "</p></a></li>";
		
				}
		
				var checkoutlist = $('#list-tasks-admin');
			
				checkoutlist.html(listado).listview("refresh");
		
			} else {
				console.log("No hay datos que mostrar");
				$('#list-tasks-admin').empty();				
		
			}
			
		} 
	
}


function gotoTask(posTask){
	
	// posTask is the position in the localstorage	
	$.mobile.pageContainer.pagecontainer('change', '#page-task-moreinfo', {transition: 'slide' });
	
	var arrayObjetos = window.localStorage.getArray("listOfallTasks");
	var typeOfTask = arrayObjetos[posTask].typeOfTask;
	
	var typeOfTaskShort = typeOfTask;
	if (hasWhiteSpace(typeOfTaskShort)) {
		typeOfTaskShort  = typeOfTaskShort.replace(/\s/g, "");		
	}
	var imagePathTask = "img/tasks/"+typeOfTaskShort+".jpg";
	if(arrayObjetos[posTask].isDone=="Yes"){
		$("#set-task-done").buttonMarkup({ theme: "b" });
	}
	else{
		$("#set-task-done").buttonMarkup({ theme: "a" });
	}
	
	
	$('#img-task-moreinfo').attr("src",imagePathTask);
	$('#typeof-task').empty();
	$('#typeof-task').append('<h3 id="task-type-info">'+typeOfTask+'</h3><h2 id="task-marked-done" style="white-space:normal; font-weight:normal;">Is done: '+arrayObjetos[posTask].isDone +'</h2>');
	$('#task-technician').val(arrayObjetos[posTask].technicianName);
	$( "#task-description" ).textinput({ autogrow: true });
	$('#task-description').text(arrayObjetos[posTask].description);
	$('#task-date').val(arrayObjetos[posTask].dateOfTask);
	$('#task-duration').val(arrayObjetos[posTask].durationOfTask);
	
	
}

