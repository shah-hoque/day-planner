// Runs code after DOM elements are loaded
$(document).ready(function () {

$("#saveChangeBtn").hide();

// EVENT LISTENERS -----------------------------------

// checks if any text input field has changed
$("input").on("input", function () {
  $("#saveChangeBtn").show();
});

// save user inputs / changes to local storage
$("#saveChangeBtn").on("click", function () {
  $("input").each(function () {
    // save key as (this) id & value pair as (this) val
    localStorage.setItem($(this).attr("id"), $(this).val());
  });
  $("#saveChangeBtn").hide();
});


// EVENT LISTENERS (end) -----------------------------------



// get todays day and parse into id
const todaysDay = moment().format("dddd");
$("#day-today").text(todaysDay);


// array of times to check against
const BlocksAsTime = ["9:00am","10:00am","11:00am","12:00pm","1:00pm","2:00pm","3:00pm","4:00pm","5:00pm"]


// array of all 9 input textarea to apply style to
const allBlocksIds = ["#num9","#num10","#num11","#num12","#num1","#num2","#num3","#num4","#num5"]


// colour textarea if an hr has passed or it's the current hr
function timeChecker() {
  const currentDateTime = moment(); // gets current day/time

  for(let i = 0; i < BlocksAsTime.length; i++) {
    let blockTime = moment(BlocksAsTime[i], "h:mm a") // gets a time as a moment object

    if (currentDateTime.isAfter(blockTime)) {
      $(allBlocksIds[i]).css('background-color', 'red')
    }
    
    if (currentDateTime.hour() === blockTime.hour()) {
      $(allBlocksIds[i]).css('background-color', 'green')
    } 
  }
}
setInterval(timeChecker, 1000); // runs the timeChecker func every second




});