// Runs func's after DOM elements are loaded
$(document).ready(function () {

  // Get todays day and parse into id
  const todaysDay = moment().format("dddd");
  $("#day-today").text(todaysDay);



const BlocksAsTime = ["9:00am","10:00am","11:00am","12:00pm","1:00pm","2:00pm","3:00pm","4:00pm","5:00pm"]

const allBlocksIds = ["#num9","#num10","#num11","#num12","#num1","#num2","#num3","#num4","#num5"]

console.log(allBlocksIds)


function timeChecker() {
  const currentDateTime = moment();

  for(let i = 0; i < BlocksAsTime.length; i++) {

    let blockTime = moment(BlocksAsTime[i], "h:mm a")

    if (currentDateTime.isAfter(blockTime)) {
      console.log(allBlocksIds[i])


      $(allBlocksIds[i]).css('background-color', 'blue')
    }

  }


}
// setInterval(timeChecker, 10000);



timeChecker()




});