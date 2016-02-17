var currentTime = require('./../js/time-interface.js').startTime;
var timer = require('./../js/timer.js').createTimer;

$(document).ready(function( )
{
  var selectedTime = [];
  var alarm = "";
  setupInput( );
  startTickTime( );

  $(".hour").on("click", function( ) {
    var selectedHour = ["hour", parseInt( this.id )];
    selectedTime.push( selectedHour );
  });

  $(".minute").on("click", function( ) {
    var selectedMinute = ["minute", parseInt( this.id )];
    selectedTime.push( selectedMinute );
  });

  $(".second").on("click", function( ) {
    var selectedSecond = ["second", parseInt( this.id )];
    selectedTime.push( selectedSecond );
  });

  $(".ampm").on("click", function( ) {
    var selectedAmPm = ["ampm", this.id];
    selectedTime.push( selectedAmPm );
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
    var dropdownHour = $("#dropdown-hour");
    var dropdownMinute = $("#dropdown-minute");

    for( var i = 1; i < 13; i++ ){
      $("#dropdown-hour").append("<li id='" + i + "' class='hour'>" + i + "</li>");
    }

//MINUTES
    // for( var i = 0; i < 60; i += 10 )
    for( var i = 0; i < 60; i ++ ){
      if( i < 10 ){
        i = '0' + i.toString();
      }
      $("#dropdown-minute").append("<li id='" + i + "' class='minute'>" + i + "</li>");
    }

//SECONDS
    for( var i = 0; i < 60; i += 10 ){
      if( i < 10 ){
        ii = '0' + i.toString();
      } else { ii = i; }
      $("#dropdown-second").append("<li id='" + ii + "' class='second'>" + ii + "</li>");
    }

    $("#dropdown-ampm").append("<li id='" + "am" + "' class='ampm'>" + "AM" + "</li>");
    $("#dropdown-ampm").append("<li id='" + "pm" + "' class='ampm'>" + "PM" + "</li>");
  }
});
