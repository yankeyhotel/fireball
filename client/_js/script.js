$(document).ready(function(){

	var oldClass 	= "yellow";
	var colorsArray = new Array(
								"yellow",
								"orange",
								"carrot",
								"pumpkin",
								"alizarin",
								"pomegranate"
								);

	var myVar = setInterval(function(){
								var random = Math.floor((Math.random() * colorsArray.length));
								$(".fireball").removeClass(oldClass);
								$(".fireball").addClass(colorsArray[random]);
								oldClass = colorsArray[random];
							}, 500);


	if ($("#task-modal").length) {
		
	}

});