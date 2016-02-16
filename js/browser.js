var currentTime = require('./../js/time-interface.js').startTime;
var timer = require('./../js/timer.js').createTimer;

$(document).ready(function( )
{
  var dropdownHour = $("#dropdown-hour");
  var dropdownMinute = $("#dropdown-minute");

  for( var i = 1; i < 13; i++ )
  {
    $("#dropdown-hour").append("<li id='" + i + "'>" + i + "</li>");
  }

  for( var i = 0; i < 60; i += 10 )
  {
    $("#dropdown-minute").append("<li id='" + i + "'>" + i + "</li>");
  }

  for( var i = 0; i < 60; i += 10 )
  {
    $("#dropdown-second").append("<li id='" + i + "'>" + i + "</li>");
  }

  $("#dropdown-ampm").append("<li id='" + "am" + "'>" + "AM" + "</li>");
  $("#dropdown-ampm").append("<li id='" + "pm" + "'>" + "PM" + "</li>");

  startTickTime( );
  function startTickTime( )
  {
    $("#time").text(currentTime);
    timer( 1000, startTickTime, 'tickTimer' );
  }
});
