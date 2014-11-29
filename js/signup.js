/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

document.addEventListener('DOMContentLoaded', onLoad);

function onLoad () {
	var stateSelect = document.getElementById("state");
    Object.keys(usStates).forEach(function(element, index) {
       var stateOption =  document.createElement("OPTION");
       stateOption.label = usStates[index].code;
       stateOption.value = usStates[index].name;
       stateSelect.appendChild(stateOption);
    });

	document.addEventListener('change', onOccupationSelect);

	function onOccupationSelect () {
		var occupationName = document.getElementById("occupation");
		var occupationOtherStyle = document.getElementById("occupationOther").style;
		if(occupationName.value == "other") {
			 occupationOtherStyle.display = "block";
		} 
		else {
			occupationOtherStyle.display = "none";
		}
	}

	document.getElementById("cancelButton").addEventListener('click', function() {
		var confirmWindow = window.confirm('Are you sure you want to go?');
		if(confirmWindow) {
			window.location = 'http://www.google.com';
		}
	});

	var signupForm = document.getElementById('signup');
	signupForm.addEventListener('submit', onSubmitAttempt);
	
	function onSubmitAttempt(evt) {
		var valid = true;
		try {
			valid = validateForm();
			console.log("valid? " + valid);
		}
		catch(exception) {
			console.log(exception);
			valid = false;
		}
		
		if (!valid) {
			window.alert('Oops! Please ensure all fields are correctly inputted.');
			if (evt.preventDefault) {
				evt.preventDefault();
			}
		}

		evt.returnValue = valid;
		return valid;
	}

	function validateForm() { 

		var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state'];
		var requiredStatus = true;
		for (i = 0; i < requiredFields.length; i++) {
			var checker = checkEmptyText(requiredFields[i]);
			if(!checker) {
				requiredStatus = false;
			}
		}

		if (document.getElementById('occupation').value == 'other') {
			 if(!checkEmptyText('occupationOther')) {
			 	requiredStatus = false;
			 }
		}

		if(!zipTest()) {
			requiredStatus = false;
		}
		

		if(!testBirthday()) {
			requiredStatus = false;
		}

		return requiredStatus;

	}

	function checkEmptyText(fieldName) {
		var reqField = document.getElementById(fieldName);
		var status = true;
		var lengthTest = (0 == reqField.value.trim().length);
		if(lengthTest) {
			status = false;
		}
		highlightRequired(reqField, !lengthTest);
		return status;
	}

	function zipTest() {
		var zipResult = true;
		var zipField = document.getElementById('zip');
		var zipTest = new RegExp('^\\d{5}$');
		zipResult = zipTest.test(zipField.value);
		highlightRequired(zipField, zipResult);
		return zipResult;
	}

	function testBirthday() {
		var birthDate = document.getElementById('birthdate');
		if(!checkEmptyText('birthdate')) {
			return false;
		}
		var validator = false;
		var currDate = new Date();
		var enteredDate = new Date(birthDate.value);
		var checkYear = enteredDate.getUTCFullYear() < (currDate.getUTCFullYear() - 13);
		var checkMonth = enteredDate.getUTCMonth() <=  currDate.getUTCMonth();
		var checkDate = enteredDate.getUTCDate() <= currDate.getUTCDate();
		if (!checkYear) {
			if((enteredDate.getUTCFullYear() == currDate.getUTCFullYear() - 13)
				&& checkMonth) {
				if ((enteredDate.getUTCMonth() == currDate.getUTCMonth()) && !checkDate) {
					validator = false;
				} else {
					validator = true;
				}
			} else {
				validator = false;
			}
		} else {
			validator = true;
		}

		if (!validator) {
			document.getElementById('birthdateMessage').innerHTML = "User must be 13 or older to sign up.";
		} else {
			document.getElementById('birthdateMessage').innerHTML = "";
		}
		highlightRequired(birthDate, validator);
		return validator;

	}

	function highlightRequired(fieldElement, isCorrect) {
		if(!isCorrect) {
			fieldElement.style.border = "1px solid #FF0000";

		} else {
			fieldElement.style.border = "1px solid rgb(204, 204, 204)";
		}
	}
		
}

