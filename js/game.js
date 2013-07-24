/**
 * @method : submitUserInfo()
 * @return : void
 * @desc : This function sets username
 */
function submitUserInfo() {

	//var username = document.getElementById("username").value;
	var username = $("#username").val();
	console.log(username);
	
	// Hide screen1
	$("#dv_screen1").hide();
	//var screen1 = document.getElementById("dv_screen1");
	//screen1.style.display = 'none';
	
	// Display screen2	
	$("#dv_screen2").show();
	//var screen2 = document.getElementById("dv_screen2");
	//screen2.style.display = 'block';
	
	random_color();
	
	// Display Username
	//document.getElementById("lbl_username").innerHTML = "Welcome : "+username;
	$("#username").html("Welcome : "+username);
	
}


/**
 * @method : random_color()
 * @return : void
 * @desc : This function provides random color to the table cells
 */
function random_color() {
	var arr = ['btn-primary','btn-info','btn-warning','btn-danger','black','light_red','brown','green','grey','blue','olive','wax'];
	var idx = Math.floor(Math.random() * arr.length);
	$(".gamebox").addClass(arr[idx]);
}

/**
 * @method : slide_it()
 * @param : elem string
 * @param : direction string
 * @param : distance int
 * @param : slideDuration int
 * @return : void
 * @desc : This function slides the screen
 */
function slide_it(elem, direction, distance, slideDuration){

    var elmt = document.getElementById(elem),
        i=0, step = distance / (slideDuration*20),
        stepper = setInterval(function() {
            i = Math.min(distance,i+step);
            elmt.style.left = i+'px';
            if( i == distance) clearInterval(stepper);
        },50);
}

/**
 * @method : change_color()
 * @param : element string
 * @return : void
 * @desc : This function change the color of <td> on click
 */
function change_color(element) {

	if (element.className == 'td_change_color td_cursor') {
		alert("This square is already occupied. Please select other square.");
		return false;
		/*element.className = "";
		element.className = "td_cursor";
		return false;*/
	}
	//element.style.backgroundColor = 'lightgreen';
	element.className = "td_change_color td_cursor";
	
	var count = document.getElementById("spn_value").innerHTML;
	
	count = parseFloat(count) - 1;
	document.getElementById("spn_value").innerHTML = count;
	
	//get value of the td
	var new_value = element.innerHTML;

	//get the value of hidden field
	var prev_value = document.getElementById("hid_store_value").value;
	
	//add new <td> value to previous value
	var total_value = prev_value + "," + new_value;
	
	//set hidden field value null
	document.getElementById("hid_store_value").value = "";
	
	//set the hidden field value
	document.getElementById("hid_store_value").value = total_value;
	
	if (count == 0) {
	
		get_result();		
		
	}
	
}

/**
 * @method : get_result()
 * @return : void
 * @desc : This function open new screen to display result
 */
function get_result() {

	// Hide screen2
	var screen2 = document.getElementById("dv_screen2");
	screen2.style.display = 'none';
	
	// Display screen3
	var screen3 = document.getElementById("dv_screen3");
	screen3.style.display = 'block';
	
	var answer = document.getElementById("hid_store_value").value;
	
	// Remove first comma
	answer = answer.slice(1);
	
	// Split a string into an array
	var array = new Array();
	array = answer.split(",");
	
	// Convert to numbers
	for(var i=0; i<array.length; i++) { array[i] = +array[i]; } 
	
	// Call index_of_IE() to make indexOf() workable for IE
	index_of_IE();		
	
	if(array.indexOf(1)>-1 && array.indexOf(5)>-1 && array.indexOf(9)>-1){
		
		document.getElementById("lbl_result").innerHTML = "Wow, Correct Selection!";
		
	} else if(array.indexOf(3)>-1 && array.indexOf(5)>-1 && array.indexOf(7)>-1){
		
		document.getElementById("lbl_result").innerHTML = "Wow, Correct Selection!";
	
	} else {
	
		document.getElementById("lbl_result").innerHTML = "Sorry, In-correct!";
	
	}
	
	document.getElementById("hid_store_value").value = "";
	
}

/**
 * @method : play_again()
 * @return : void
 * @desc : This function open game screen and hides result screen
 */
function play_again() {
	
	// Hide screen3
	var screen3 = document.getElementById("dv_screen3");
	screen3.style.display = 'none';
	
	// Display screen2
	var screen2 = document.getElementById("dv_screen2");
	screen2.style.display = 'block';
	
	//slide_it('dv_screen2','left',685,1);
	
	var count = 3;
	document.getElementById("spn_value").innerHTML = count;
	
	random_color();
	
}

/**
 * @method : index_of_IE()
 * @return : void
 * @desc : This function makes indexOf workable for IE
 */
function index_of_IE() {

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