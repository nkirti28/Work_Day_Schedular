$(function () {
  //console.log("ready");
  var today = moment().format("dddd, MMMM Do YYYY");
  var now = moment().format("H A");
  // Array of objects() work day hours with time and desc)
  var workDayHours = [
    { time: "9  AM", eventDesc: "" },
    { time: "10 AM", eventDesc: "" },
    { time: "11 AM", eventDesc: "" },
    { time: "12 PM", eventDesc: "" },
    { time: "1  PM", eventDesc: "" },
    { time: "2  PM", eventDesc: "" },
    { time: "3  PM", eventDesc: "" },
    { time: "4  PM", eventDesc: "" },
    { time: "5  PM", eventDesc: "" },
  ];

  // displays current day o top of the calender
  $("#currentDay").text(today);

  //displays planned work days in the Calender from loacalstorage if any

  var getPlanInfo = JSON.parse(localStorage.getItem("planDay"));
  console.log(getPlanInfo);
  if (getPlanInfo) {
    workDayHours = getPlanInfo;
  }

  // creates  row with time , desc and save button and appends to container
  $(workDayHours).each(function (index, timeDiv) {
    var timeLable = timeDiv.time;
    var descEvent = timeDiv.eventDesc;
    var rowColor = colorBlock(timeLable);
    console.log(rowColor);

    var row = `<div class="row"><div class="col-md-1 hour"><span id="${index}">${timeLable}</span></div><textarea id="eventDesc" class="col-md-10 time-block description ${rowColor}" placeholder="Add event description here">${descEvent}</textarea><button id="saveButton" class="col-md-1 saveBtn" aria-label="save button" type="submit"><i class="fas fa-save"></i></button></div>`;

    // adding row to container
    $(".container").append(row);
  });

  // color row based on 'past' 'future' 'present' time
  function colorBlock(time) {
    var planNow = moment(now, "H A");
    var planEntry = moment(time, "H A");
    if (planNow.isBefore(planEntry) === true) {
      return "future";
    } else if (planNow.isAfter(planEntry) === true) {
      return "past";
    } else {
      return "present";
    }
  }

  // save button click - saves the event in localstorage
  $(".saveBtn").on("click", function (event) {
    event.preventDefault();

    var time = $(this).siblings(".hour").children().attr("id");
    var eventInfo = $(this).siblings(".description").val();

    console.log(eventInfo + " " + time);
    workDayHours[parseInt(time)].eventDesc = eventInfo;

    localStorage.setItem("planDay", JSON.stringify(workDayHours));
  });
});
