// RUNS CODE AFTER DOM ELEMENTS ARE LOADED
$(document).ready(function () {

$("#saveChangeBtn").hide();

// DISPLAY TODAYS DAY
const todaysDay = moment().format("dddd");
$("#day-today").text(todaysDay);


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
  });
  $("#saveChangeBtn").hide();
});

// EVENT LISTENERS (end) -----------------------------------


// FUNC) RETURN LOCAL STORAGE TO TEXT FIELDS
$("input[type='text']").each(function () {
  // gets the val from local storage associated with the text input id
  var localValue = localStorage.getItem($(this).attr("id"));
  // if local storage val exists then set the val of (this) text field to localValue
  if (localValue) {
    $(this).val(localValue);
  }
});


// FUNC) CLEAR LOCAL STORAGE
$("#clearPlannerBtn").on("click", function () {
  localStorage.clear();
  $("input").val(""); // clear all inputs text field
});

// FUNC) COLOUR TEXT FIELD IF CHECKBOX CHECKED




// FUNC) COLOUR TEXT FIELDS IF X HR HAS PASSED OR IT'S THE CURRENT HR
function timeChecker() {
  const currentDateTime = moment(); // gets current day/time

  for(let i = 0; i < BlocksAsTime.length; i++) {
    let blockTime = moment(BlocksAsTime[i], "h:mm a") // gets x time as a moment object

    if (currentDateTime.isAfter(blockTime)) {
      $(allBlocksIds[i]).css('background-color', 'red')
    }
    
    if (currentDateTime.hour() === blockTime.hour()) {
      $(allBlocksIds[i]).css('background-color', 'green')
    } 
  }
}
setInterval(timeChecker, 1000); // runs the timeChecker func every second


// ARRAY OF TIMES TO CHECK AGAINST
const BlocksAsTime = ["9:00am","10:00am","11:00am","12:00pm","1:00pm","2:00pm","3:00pm","4:00pm","5:00pm"]


// ARRAY OF ALL 9 INPUT TEXT FIELD TO APPLY STYLES TO
const allBlocksIds = ["#num9","#num10","#num11","#num12","#num1","#num2","#num3","#num4","#num5"]

});