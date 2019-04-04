var prevSelection = "tab1-admin"; 


$("#navbar-admin ul li").on("click", function() {
	var newSelection = $(this).children("a").attr("data-tab-class");
	if(newSelection == "tab1-admin"){
		loadAllTasks();
	}
	else if(newSelection == "tab2-admin"){
		recuperateTasksOfTech();
	}
	else if(newSelection == "tab3-admin"){
		
		 numberTasksOfTechs();
	}
	prevSelection = newSelection;
	
});



jQuery("#admin-page").on( "pageshow", function( event ) {	

	if(prevSelection == "tab1-admin"){
		loadAllTasks();
	}
	else if(prevSelection == "tab2-admin"){
		recuperateTasksOfTech();
	}
	else if(prevSelection == "tab3-admin"){
	
		 numberTasksOfTechs();
	}
	$("#navbar-admin ul li").find('a[data-tab-class="' + prevSelection + '"]').addClass("ui-btn-active");		
	
});