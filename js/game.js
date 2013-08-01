/**
 * This file contains all the functions for game
 *
 * @package		game
 * @filename	game.js
 */

// global variable
var g_total_value = [];

/**
 * @method : checkScreen()
 * @return : void
 * @desc : This function changes right screen depending on the current screen
 */
function checkScreen() {

	// Show left and right icon
	$('.carousel-inner').children('.carousel-control').show();
	
	$('#carousel').on('slid', '', function() {
		if($('.carousel-inner .item:first').hasClass('active')) {
			// Hide left icon if this is first screen
			$('.carousel-inner').children('.left.carousel-control').hide();
		} else if($('.carousel-inner .item:last').hasClass('active')) {
			// Hide right icon if this is last screen
			$('.carousel-inner').children('.right.carousel-control').hide();
		} else {
			// Call submitUserInfo() and playAgain() function
			submitUserInfo();
			// If 1 or 2 box is clicked previously then empty g_total_value array
			g_total_value = [];
			playAgain();
		}
	});
	
}

/**
 * @method : submitUserInfo()
 * @return : void
 * @desc : This function sets username
 */
function submitUserInfo() {

	var username = $("#username").val();
	
	randomColor();
	
	// Display Username
	$("#lbl_username").html("Welcome : "+username);
	
}

/**
 * @method : randomColor()
 * @return : void
 * @desc : This function provides random color to all boxes
 */
function randomColor() {

	var color_array = colorClass();
	var idx = Math.floor(Math.random() * color_array.length);
	$(".gamebox").addClass(color_array[idx]);

}

/**
 * @method : colorClass()
 * @return : array
 * @desc : This function returns color class as array
 */
function colorClass() {

	var color_array = ['btn-primary','btn-info','btn-warning','btn-danger','black','light_red','brown','green','grey','blue','olive','wax'];
	return color_array;

}

/**
 * @method : changeColor()
 * @param : element string
 * @return : void
 * @desc : This function alerts if box is already selected else call changeBoxColor()
 */
function changeColor(element) {
	
	// Split css classes by space from div which is clicked
	var split_class = (element.className).split(" ");
	
	// Call indexOfIE() to make indexOf() workable for IE
	indexOfIE();
	
	// Alert if box is already selected
	if (split_class.indexOf('change_color')>-1) {		
		$(".modal-title").html('Select other box');
		$(".modal-body").html('This box is already occupied. Please select other box.');	
		$('#modal').modal('show');		
		return false;
	}	
	
	// Store #spn_value in count variable
	var count = $("#spn_value").html();
	count = parseFloat(count) - 1;
	
	if (count >= 0) {
		// Store count value in #spn_value
		$("#spn_value").html(count);
		
		// Call changeBoxColor() function to change color of the box
		changeBoxColor(element,split_class);		
	} else {
		// Alert using bootstrap modal
		$(".modal-title").html('Select only 3 boxes');
		$(".modal-body").html('You can select only 3 boxes.');	
		$('#modal').modal('show');
	}		
	
	//If count = 0, then call getResult() function
	if (count == 0) {
		// Slide to next screen if 3rd box is clicked
		$('#carousel').carousel('next');
		getResult();
	}
	
}

/**
 * @method : changeBoxColor()
 * @param : element string
 * @param : split_class string
 * @return : void
 * @desc : This function change the color of boxes on click
 */
function changeBoxColor(element,split_class) {

	var color_array = colorClass();
	var idx;
	var color_class;	
	
	// Call indexOfIE() to make indexOf() workable for IE
	indexOfIE();
	
	// To remove previous color class and add change_color class
	for (idx=0;idx<color_array.length;idx++) {
		// Store color_array[idx] color class in color_class
		color_class = color_array[idx];
		
		// If clicked box is having color_class then remove this and add change_color class
		if(split_class.indexOf(color_class)>-1) {
			$(element).removeClass(color_class).addClass('change_color');
		}
	}	

	//get value of the div box
	var new_value = $(element).html();

	// Push the values in g_total_value array
	g_total_value.push(new_value);

}
/**
 * @method : getResult()
 * @return : void
 * @desc : This function open new screen to display result
 */
function getResult() {
	
	// Split a string into an array
	var result = [];
	
	result = g_total_value;
	
	// Convert to numbers
	for(var i=0; i<result.length; i++) { result[i] = +result[i]; } 
	
	// Call indexOfIE() to make indexOf() workable for IE
	indexOfIE();		
	
	if(result.indexOf(1)>-1 && result.indexOf(5)>-1 && result.indexOf(9)>-1){
		
		$("#lbl_result").html("Wow, Correct Selection!");
		
	} else if(result.indexOf(3)>-1 && result.indexOf(5)>-1 && result.indexOf(7)>-1){
		
		$("#lbl_result").html("Wow, Correct Selection!");
	
	} else {
	
		$("#lbl_result").html("Sorry, In-correct!");
	
	}
	
	//Emmpty the array
	g_total_value = [];
	
}

/**
 * @method : play_again()
 * @return : void
 * @desc : This function open game screen and hides result screen
 */
function playAgain() {
	
	// Store 3 in #spn_value
	$("#spn_value").html(3);	
	removeClass();	
	randomColor();
	$("#lbl_result").html("Please select 3 boxes!");
	
}

/**
 * @method : removeClass()
 * @return : void
 * @desc : This function removes class "change_color" and previous random color class
 */
function removeClass() {
	
	// Call indexOfIE() to make indexOf() workable for IE
	indexOfIE();
	
	var box;
	var split_class;	
	var idx;
	var color_class;
	var color_array = colorClass();
	
	for (i=0;i<9;i++) {
		box = $(".gamebox")[i];
		// Remove class "change_color" from box
		$(box).removeClass("change_color");
		
		split_class = (box.className).split(" ");	
	
		// To remove previous random color class from box
		for (idx=0;idx<color_array.length;idx++) {
			// Store color_array[idx] color class in color_class
			color_class = color_array[idx];
			
			if(split_class.indexOf(color_class)>-1) {
				// Remove "previous random color" class from box
				$(box).removeClass(color_class);
			}
		}
	}
	
}

/**
 * @method : quitGame()
 * @return : void
 * @desc : This function reloads the page
 */
function quitGame() {
	location.reload();
}

/**
 * @method : indexOfIE()
 * @return : void
 * @desc : This function makes indexOf workable for IE
 */
function indexOfIE() {

	// To make indexOf() workable for IE
	if (!Array.prototype.indexOf) {		
		Array.prototype.indexOf = function(obj, start) {
			 for (var i = (start || 0), j = this.length; i < j; i++) {
				 if (this[i] === obj) { return i; }
			 }
			 return -1;
		}
	}
	
}