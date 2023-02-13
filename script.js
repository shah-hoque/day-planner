// Get todays day and parse into id
$(document).ready(function () {
  const todaysDay = moment().format("dddd");
  $("#day-today").text(todaysDay);
});


console.log(todaysDay)





function timeChecker() {
  const currentDateTime = moment();
  const futureDateTime = moment("4:01pm", "h:mmA");

  if (currentDateTime.isBefore(futureDateTime)) {
    console.log("time not reached yet");
  } else if (currentDateTime.isSame(futureDateTime)) {
    console.log("it's same");
  } else {
    console.log("already past that time");
  }
}

setInterval(timeChecker, 1000);

