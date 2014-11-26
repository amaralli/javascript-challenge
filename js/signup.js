/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

document.addEventListener('DOMContentLoaded', onLoad);

function onLoad () {
    Object.keys(usStates).forEach(function(element, index) {
       var stateAbbrev =  document.createElement("OPTION");
       document.getElementById("option").label = usStates[index].code;
       document.getElementById("state").appendChild(stateAbbrev);
    });

}