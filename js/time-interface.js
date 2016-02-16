exports.startTime = function( )
{
  tickTime( );
  setInterval( tickTime, 1000 );
  function tickTime( )
  {
    var time = moment( );
    var hours = time._d.getHours( ).toString( );
    var minutes = time._d.getMinutes( ).toString( );
    var seconds = time._d.getSeconds( ).toString( );

    if( hours < 10 )
    {
      var start = "0" + hours;
      hours = start;
    }

    if( minutes < 10 )
    {
      var start = "0" + minutes;
      minutes = start;
    }

    if( seconds < 10 )
    {
      var start = "0" + seconds;
      seconds = start;
    }
    var printOut = hours + ":" + minutes + ":" + seconds;
    $("#time").text(printOut);
  }
}

$(document).ready(function() {

});
