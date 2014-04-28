
jQuery( "#loginButton" ).on( "vclick", function( event ) {
	 
	var userName = $("#select-choice-userid option:selected").text();
	//var userName = $("#nombredeusuario").val();
	var userPassword = $("#clave").val();
	
	if((userPassword == "admin")&&(userName == "Admin")){		  
	 	
		$.mobile.pageContainer.pagecontainer('change', '#admin-page', {transition: 'slide' });
	  
	}else if(userPassword == "user"){  
		
		
		if(userExists(userName)){
			$("#profile-technician-name").text(userName);
			
			var nameOfTechShort = userName;
			if (hasWhiteSpace(nameOfTechShort)) {
				nameOfTechShort  = nameOfTechShort.replace(/\s/g, "");		
			}
			var imagePathUser = "img/users/"+nameOfTechShort+".jpg";
			
			$("#technician-profile-img").attr("src",imagePathUser);
			$.mobile.pageContainer.pagecontainer('change', '#technician-page', {transition: 'slide' });
			//console.log("USER " + userName);
			//loadSessionTech(userName);
			
		}
		else{
			
			alert("Password or user incorrect");
		}
		
	}
	
	else{
		
		alert("Password or user incorrect");
	}
	
  
	return false;
});

function userExists(nameUser){
	var exists = false;
	var cont = 0;
	
	while((!exists)&&(cont<arrayUsers.length)){			

		if(nameUser == arrayUsers[cont]){
			
			console.log("EXISTE");
			exists = true;
		}
		else{
			cont++;
			
		}	
		
	}
	
	return exists;
}

/* Al pulsar SI cuando se selecciona SALIR*/
$("#exitButton").click(function() {
	navigator.app.exitApp();
});