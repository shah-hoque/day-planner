// Runs code after DOM elements are loaded
$(document).ready(function () {

$("#saveChangeBtn").hide();

// EVENT LISTENERS -----------------------------------

// checks if any text input field has changed
$("input").on("input", function () {
  $("#saveChangeBtn").show();
});


// EVENT LISTENERS (end) -----------------------------------



// Get todays day and parse into id
const todaysDay = moment().format("dddd");
$("#day-today").text(todaysDay);


// Array of times to check against
const BlocksAsTime = ["9:00am","10:00am","11:00am","12:00pm","1:00pm","2:00pm","3:00pm","4:00pm","5:00pm"]


// Array of all 9 input textarea to apply style to
const allBlocksIds = ["#num9","#num10","#num11","#num12","#num1","#num2","#num3","#num4","#num5"]


// Colour textarea if an hr has passed or it's the current hr
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