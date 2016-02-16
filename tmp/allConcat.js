var currentTime = require('./../js/time-interface.js').startTime;

$(document).ready(function( )
{
  console.log("ready");
  startTickTime( );
  function startTickTime( )
  {
    $("#time").text(currentTime);
    setInterval( startTickTime, 1000 );
  }
});
