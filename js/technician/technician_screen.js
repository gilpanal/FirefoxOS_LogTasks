jQuery("#technician-page").on( "pagebeforeshow", function( event ) {	
	
	console.log("BEFORE SHOW " + $("#profile-technician-name").text());
	var techname = $("#profile-technician-name").text();
	loadSessionTech(techname);
		
});


function loadSessionTech(nameOfTech){
		
		var numberOfTasks = 0;
	
	
		if (!window.localStorage["listOfallTasks"]) {
			
			console.log("No existe el localstorage - listOfallTasks");
		}
	
		else{	
			
			
			var arrayObjetos = window.localStorage.getArray("listOfallTasks");
			var listado = "";			
			
			
			if (arrayObjetos && arrayObjetos.length > 0) {					
		
				for ( var i = 0; i < arrayObjetos.length; i++) {	
					
					if(nameOfTech == arrayObjetos[i].technicianName){						
						
						var icontype ="";
						if(arrayObjetos[i].isDone =="No"){
							numberOfTasks++;
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
					
						listado += "<li data-icon="+icontype+"><a href='javascript:gotoTask("+i+");'><img class='thumb' src='" + picturePath + "' /><h3 >" + typeOfTask + ' ' + campoVacio + ''
						+ "</h3><p>" + dateOfTask + ' ' + campoVacio + "</p></a></li>";
					}	
					
		
				}	
				
				console.log("NUMBER " + numberOfTasks);
				var checkoutlist = $('#list-tasks-technician');
		
				checkoutlist.html(listado).listview("refresh");
		
			} else {
				console.log("No hay datos que mostrar");
				$('#list-tasks-technician').empty();				
			}
			
		}
		
		$("#profile-technician-pending").text("Pending tasks: "+numberOfTasks);
}


