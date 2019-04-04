Storage.prototype.setArray = function(key, obj) {
	return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getArray = function(key) {
	return JSON.parse(this.getItem(key))
}
Storage.prototype.deleteArray = function(key) {
	return this.removeItem(key)
}

/* Check if string contains whitespace */
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

