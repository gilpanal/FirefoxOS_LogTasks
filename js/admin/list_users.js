$( "#admin-page" ).on( "pagebeforeshow",
		function() {

			var arrayLength = arrayUsers.length;
			var cont = 0;
			var listado = "";
			for ( var i = 0; i < arrayLength; i++) {				
				
				var idElem = "listusers-pending-tasks-"+i;
				
				listado += "<li><a href='javascript:detailUserInfo("+i+");'><img class='thumb' src='" + arrayUsersImages[i] + "' /><h3>" + arrayUsers[i] + "</h3><p id="+idElem+">Pending tasks: 0</p></a></li>";

			}
			
			var checkoutlist = $('#list-users-admin');			
			checkoutlist.html(listado).listview("refresh");
		}

);


function numberTasksOfTechs(){
	
	var arrayLength = arrayUsers.length;
	var arrayConts = new Array(arrayLength);
	
	for(var j = 0; j < arrayConts.length; j++){
		
		arrayConts[j] = 0 ;
		$("#listusers-pending-tasks-"+j).text("Pending tasks: " + arrayConts[j]);
	}
	
	if (!window.localStorage["listOfallTasks"]) {
			
			console.log("No existe el localstorage - listOfallTasks");
	}
	
	else{			
		
		var arrayObjetos = window.localStorage.getArray("listOfallTasks");
			
		
		if (arrayObjetos && arrayObjetos.length > 0) {	

	
			for ( var i = 0; i < arrayUsers.length; i++) {					
				
				
				for ( var k = 0; k < arrayObjetos.length; k++) {					
					
				
					if(arrayUsers[i] == arrayObjetos[k].technicianName){	
						
						if(arrayObjetos[k].isDone=="No"){
							arrayConts[i]++  ;
						}
						
					}
					
				
				}
				
				$("#listusers-pending-tasks-"+i).text("Pending tasks: " + arrayConts[i]);
			}
	
			
	
		} else {
			console.log("No hay datos que mostrar");
			
		}		
	}  	
}

function detailUserInfo(pos){		

	$.mobile.pageContainer.pagecontainer('change', '#page-tech-info', {transition: 'slide' });
	
	var nameTech = arrayUsers[pos];
	if (hasWhiteSpace(nameTech )) {
		nameTech  = nameTech.replace(/\s/g, "");		
	}
	var imagePathTech = "img/users/"+nameTech+".jpg";
	$('#img-user-moreinfo').attr("src",imagePathTech);
	$('#technician-name').empty();
	$('#technician-name').append('<h3 id="about-technician-name">'+arrayUsers[pos]+'</h3><p style="white-space:normal; font-weight:normal;">Technician</p>');
	
}

jQuery("#page-tech-info").on( "pageshow", function( event ) {	
	

	var usernameTech = $("#about-technician-name").text();
	showTechnicianTasks(usernameTech);

		
});



function showTechnicianTasks(nameOfTech){
	
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
						
						icontype ="clock";
					}
					else{
						icontype ="check";
					}
					
					var typeOfTask = arrayObjetos[i].typeOfTask;
					listado += "<li data-icon="+icontype+"><a href='javascript:gotoTask("+i+");'><p>" + typeOfTask +  "</p></a></li>";
				}	
			}
	
			var checkoutlist = $('#listof-tech-task-profile');			
			checkoutlist.html(listado).listview("refresh");
	
		} else {
			
			$('#listof-tech-task-profile').empty();				
			
		}		
	}  	
}


