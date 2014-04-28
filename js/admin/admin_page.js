var prevSelection = "tab1-admin"; // por defecto

//Guarda el TAB seleccionado
$("#navbar-admin ul li").on("click", function() {
	var newSelection = $(this).children("a").attr("data-tab-class");
	if(newSelection == "tab1-admin"){
		loadAllTasks();
	}
	else if(newSelection == "tab2-admin"){
		recuperateTasksOfTech();
	}
	else if(newSelection == "tab3-admin"){
		//recuperateTasksOfTech();
		 numberTasksOfTechs();
	}
	prevSelection = newSelection;
	
});



// Marca el TAB que se habia quedado seleccionado
jQuery("#admin-page").on( "pageshow", function( event ) {	
//jQuery("#admin-page").on( "pagebeforeshow", function( event ) {	

	if(prevSelection == "tab1-admin"){
		loadAllTasks();
	}
	else if(prevSelection == "tab2-admin"){
		recuperateTasksOfTech();
	}
	else if(prevSelection == "tab3-admin"){
		//recuperateTasksOfTech();
		 numberTasksOfTechs();
	}
	$("#navbar-admin ul li").find('a[data-tab-class="' + prevSelection + '"]').addClass("ui-btn-active");		
	
});