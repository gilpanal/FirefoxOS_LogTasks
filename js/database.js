var arrayUsers = [ "Jon Snow", "Jesse Pinkman", "Walter White" ];

var userImagePath = "img/users/";

var arrayUsersImages = new Array();

function initializeArrayUserImages(){
	
	for (var j = 0; j< arrayUsers.length;j++){
		
		var userName = arrayUsers[j];
		
		if(hasWhiteSpace(userName)){
			
			userName = userName.replace(/\s/g, "");		
			
		}	
		
		arrayUsersImages[j] = userImagePath + userName + ".jpg";
	}
}

var arrayTasksJonSnow =["Electric problems","Inspection","Quality audit"];
var arrayTasksJessePinkman =["Electric problems","Building work","Quality audit"];
var arrayTasksWalterWhite =["Building work","Inspection","Quality audit"];

$( document ).ready(function() { 
		
	initializeArrayUserImages();
	
});