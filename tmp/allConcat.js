var currentTime = require('./../js/time-interface.js').startTime;
var timer = require('./../js/timer.js').createTimer;

$(document).ready( function( ){

  var selectedTime = [];
  var alarm = "";
  setupInput( );
  startTickTime( );

  $("#dropdown-hour").change(function( ) {
    var selectedHour = $('#dropdown-hour').val();
    selectedTime[0] = selectedHour;
  });

  $("#dropdown-minute").change(function( ) {
    var selectedMinute = $('#dropdown-minute').val();
    selectedTime[1] = selectedMinute;
  });

  $("#dropdown-second").change(function( ) {
    var selectedSecond = $('#dropdown-second').val();
    selectedTime[2] = selectedSecond;
  });

  $("#dropdown-ampm").change(function( ) {
    var selectedAmPm = $('#dropdown-ampm').val();
    selectedTime[3] = selectedAmPm;
    console.log(selectedTime);
  });

  $("#set-alarm").on("click", function( ) {
    if( selectedTime.length === 4 )
    {
        var alarmTime = [];
        selectedTime.map(function(timeSegment){
          if( timeSegment[ 0 ] === "hour" ){
            alarmTime[0] = timeSegment[1];
          }

          else if( timeSegment[ 0 ] === "minute" ){
            if( timeSegment[1] < 10 ){
              var swap = "0" + timeSegment[1].toString( );
              alarmTime[1] = swap;
            }
            else {
              alarmTime[1] = timeSegment[1];
            }
          }

          else if( timeSegment[ 0 ] === "second" ){
            if( timeSegment[1] < 10 ){
              var swap = "0" + timeSegment[1].toString( );
              alarmTime[2] = swap;
            }
            else {
              alarmTime[2] = timeSegment[1];
            }
          }

          else if( timeSegment[ 0 ] === "ampm" ){
            alarmTime[3] = timeSegment[1].toUpperCase( );
          }
      });//MAP

      alarm = alarmTime[0].toString() + ":" + alarmTime[1].toString() + ":" + alarmTime[2].toString() + " " + alarmTime[3];
      console.log(alarm);


    }
    else{
      alert("Select each item, por favor.");
    }
  });

  function startTickTime(){
    $("#time").text(currentTime);

    if( alarm == currentTime() ){
      $("#time").addClass("alarm");
      console.log("WAKE UP!");
    }
    timer( 1000, startTickTime, 'tickTimer' );
  }

  function setupInput( ){
    // HOUR OPTIONS
    for( var i = 1; i < 13; i++ ){
      $("#dropdown-hour").append("<option value='" + i + "'>" + i + "</option>");
    }

    //MINUTE OPTIONS
    for( var i = 0; i < 60; i ++ ){
      // for( var i = 0; i < 60; i += 10 )
      if( i < 10 ){
        i = '0' + i.toString();
      }
      $("#dropdown-minute").append("<option value='" + i + "'>" + i + "</option>");
    }
    //SECOND OPTIONS
    for( var i = 0; i < 60; i += 10 ){
      if( i < 10 ){
        ii = '0' + i.toString();
      } else { ii = i; }
      $("#dropdown-second").append("<option value='" + ii + "'>" + ii + "</option>");
    }
    // AM/PM OPTIONS
    $("#dropdown-ampm").append("<option value='am'>" + "AM" + "</option>");
    $("#dropdown-ampm").append("<option value='pm'>" + "PM" + "</option>");
  }
});
