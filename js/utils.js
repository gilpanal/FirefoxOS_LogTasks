/** Funciones para trabajar con arrays del localstorage **/
Storage.prototype.setArray = function(key, obj) {
	return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getArray = function(key) {
	return JSON.parse(this.getItem(key))
}
Storage.prototype.deleteArray = function(key) {
	return this.removeItem(key)
}

/** Funcion para comprobar si un string contiene espacios en blanco **/
function hasWhiteSpace(s) {

	return s.indexOf(' ') >= 0;
}

$("#cancelbutton").click(function() {
	
	$("#popupSignOut").popup("close");

}); 
$("#signout-button").click(function() {
	
	$.mobile.pageContainer.pagecontainer('change', '#login-page', {transition: 'slide' });
	
});
$("#cancelbuttonTech").click(function() {
	
	$("#popupSignOutTech").popup("close");

}); 
$("#signout-button-Tech").click(function() {
	
	$.mobile.pageContainer.pagecontainer('change', '#login-page', {transition: 'slide' });
	
});

