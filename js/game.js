/**
 * This file contains all the functions for game
 *
 * @package		game
 * @filename	game.js
 */

// global variable
var g_total_value = [];
var SlideWidth = 1200;
var SlideSpeed = 1000;

/**
 * @method : CurrentMargin()
 * @return : int
 * @desc : This function creates margin for slide
 */
function CurrentMargin() {
	// get current margin of slider
	var currentMargin = $("#slider-wrapper").css("margin-left");

	// first page load, margin will be auto, we need to change this to 0
	if (currentMargin == "auto") {
		currentMargin = 0;
	}

	// return the current margin to the function as an integer
	return parseInt(currentMargin);
} 

/**
 * @method : NextSlide()
 * @return : void
 * @desc : This function brings next slide
 */
function NextSlide() {
	// get the current margin and subtract the slide width
	var newMargin = CurrentMargin() - SlideWidth;

	// slide the wrapper to the left to show the next panel at the set speed. Then set the nav display on completion of animation.
	$("#slider-wrapper").animate({ marginLeft: newMargin }, SlideSpeed );
}

/**
 * @method : PreviousSlide()
 * @return : void
 * @desc : This function brings previous slide
 */
function PreviousSlide() {
	// get the current margin and subtract the slide width
	var newMargin = CurrentMargin() + SlideWidth;

	// slide the wrapper to the right to show the previous panel at the set speed. Then set the nav display on completion of animation.
	$("#slider-wrapper").animate({ marginLeft: newMargin }, SlideSpeed );
} 

/**
 * @method : submitUserInfo()
 * @return : void
 * @desc : This function sets username
 */
function submitUserInfo() {

	var username = $("#username").val();
	
	// Hide screen1
	//$("#dv_screen1").hide();
	
	// Show screen2	
	//$("#dv_screen2").show();
	
	NextSlide();
	
	randomColor();
	
	// Display Username
	$("#lbl_username").html("Welcome : "+username);
	
}

/**
 * @method : randomColor()
 * @return : void
 * @desc : This function provides random color to the div box
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
 * @desc : This function change the color of <td> on click
 */
function changeColor(element) {
	
	var color_array = colorClass();
	var split_class = (element.className).split(" ");
	
	// Call indexOfIE() to make indexOf() workable for IE
	indexOfIE();
	
	if (split_class.indexOf('change_color')>-1) {
		alert("This square is already occupied. Please select other square.");
		return false;
	}
	
	var idx;
	var color_class;
	
	for (idx=0;idx<color_array.length;idx++) {
		color_class = color_array[idx];
		
		if(split_class.indexOf(color_class)>-1) {
			$(element).removeClass(color_class).addClass('change_color');
		}
	}
	
	var count = $("#spn_value").html();	
	count = parseFloat(count) - 1;
	$("#spn_value").html(count);

	//get value of the div box
	var new_value = $(element).html();

	// Push the values in g_total_value array
	g_total_value.push(new_value);
	
	if (count == 0) {	
		getResult();		
	}
	
}

/**
 * @method : getResult()
 * @return : void
 * @desc : This function open new screen to display result
 */
function getResult() {

	// Hide screen2
	//$("#dv_screen2").hide();
	
	// Show screen3
	//$("#dv_screen3").show();
	NextSlide();
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
	
	// Hide screen3
	//$("#dv_screen3").hide();
	
	// Show screen2
	//$("#dv_screen2").show();
	PreviousSlide();
	//slide_it('dv_screen2','left',685,1);
	
	$("#spn_value").html(3);
	
	removeClass();	
	
	randomColor();
	
}

/**
 * @method : removeClass()
 * @return : void
 * @desc : This function removes class "change_color" and color class
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
	
		for (idx=0;idx<color_array.length;idx++) {
			color_class = color_array[idx];
			
			if(split_class.indexOf(color_class)>-1) {
				// Remove "previous random color" class from box
				$(box).removeClass(color_class);
			}
		}
	}
	
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