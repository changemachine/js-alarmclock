var currentTime = require('./../js/time-interface.js').starTime;

$(document).ready(function( )
{
  startTickTime( );

  function startTickTime( )
  {
    $("#time").text(currentTime);
    setInterval( startTickTime, 1000 );
  }
});
