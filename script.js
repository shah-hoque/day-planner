// RUNS CODE AFTER DOM ELEMENTS ARE LOADED
$(document).ready(function () {

$("#saveChangeBtn").hide();

// DISPLAY TODAYS DAY
const todaysDay = moment().format("dddd");
$("#day-today").text("Today is " + todaysDay);


// EVENT LISTENERS -----------------------------------

// EVENT L THAT CHECKS IF ANY INPUT TEXT HAS CHANGED
$("input[type='text']").on("input", function () {
  $("#saveChangeBtn").show();
});


// EVENT L THAT SAVES USER INPUT/CHANGES TO LOCAL STORAGE
$("#saveChangeBtn").on("click", function () {
  $("input").each(function () {
    // save key as (this) id & value pair as (this) val
    localStorage.setItem($(this).attr("id"), $(this).val());

    // save checkbox status to localStorage
    var isChecked = $(this).closest(".input-group").find("input[type='checkbox']").prop("checked");
    localStorage.setItem($(this).attr("id") + "-checked", isChecked);
  });
  $("#saveChangeBtn").hide();
});


// EVENT L THAT RECORDS CHECKBOX STATUS
$("input[type='checkbox']").on("click", function () {
  
  // get boolean value of checked status
  var isChecked = $(this).prop("checked");
  
  // closest goes up the dom looking for the first instance of ".input-group", then find looks for "input[type='text']" within ".input-group"
  var textFieldViaAncestor = $(this).closest(".input-group").find("input[type='text']");
  
  // pass checked status into func that changes style
  updateTextFieldStyle(textFieldViaAncestor, isChecked);
  
  // save checkbox status to localStorage
  var id = textFieldViaAncestor.attr("id");
  localStorage.setItem(id + "-checked", isChecked);
});


// EVENT L THAT CLEARS LOCAL STORAGE
$("#clearPlannerBtn").on("click", function () {
  localStorage.clear();
  $("input").val(""); // clear all inputs text field
  $('input[type="checkbox"]').prop('checked', false); // uncheck all checkboxes
});

// EVENT LISTENERS (end) -----------------------------------


// FUNC) THAT APPLIES THE STRIKETHROUGH
function updateTextFieldStyle(textField, isChecked) {
  if (isChecked) {
    textField.css("text-decoration", "line-through");
  } else {
    textField.css("text-decoration", "none");
  }
}


// FUNC) LOOP CHECKBOXES TO UPDATE CHECKED STATUS BASED ON LOCAL STORAGE VALUE
$("input[type='checkbox']").each(function () {

  // get id text input element associated with the current checkbox
  var idFromTextFieldViaAncestor = $(this).closest(".input-group").find("input[type='text']").attr("id");

  // get the checked status for this id from localStorage
  var isChecked = localStorage.getItem(idFromTextFieldViaAncestor + "-checked");

  // Set the checked status of this checkbox to the retrieved value
  $(this).prop("checked", isChecked === "true");

  // get the text input element associated with the current checkbox using the closest ancestor with class .input-group
  var textFieldViaAncestor = $(this).closest(".input-group").find("input[type='text']");

  // update the style of the text input element based on the retrieved checked status
  updateTextFieldStyle(textFieldViaAncestor, isChecked === "true");
});


// FUNC) RETURN LOCAL STORAGE TO TEXT FIELDS
$("input[type='text']").each(function () {
  // get localStorage val using the id of the current input element as the key
  var savedValue = localStorage.getItem($(this).attr("id"));

  // display savedValue
  $(this).val(savedValue); // display savedValue
});


// FUNC) COLOUR TEXT FIELDS IF X HR HAS PASSED OR IT'S THE CURRENT HR
function timeChecker() {
  const currentDateTime = moment(); // gets current day/time

  for(let i = 0; i < BlocksAsTime.length; i++) {
    let blockTime = moment(BlocksAsTime[i], "h:mm a") // gets x time as a moment object

    if (currentDateTime.isAfter(blockTime)) {
      $(allBlocksIds[i]).css('background-color', '#f9e0db')
    }
    
    if (currentDateTime.hour() === blockTime.hour()) {
      $(allBlocksIds[i]).css('background-color', '#d4ffd4')
    } 
  }
}
setInterval(timeChecker, 1000); // runs the timeChecker func every second


// ARRAY OF TIMES TO CHECK AGAINST
const BlocksAsTime = ["9:00am","10:00am","11:00am","12:00pm","1:00pm","2:00pm","3:00pm","4:00pm","5:00pm"]


// ARRAY OF ALL 9 INPUT TEXT FIELD TO APPLY STYLES TO
const allBlocksIds = ["#num9","#num10","#num11","#num12","#num1","#num2","#num3","#num4","#num5"]

});