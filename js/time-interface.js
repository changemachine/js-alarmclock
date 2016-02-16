exports.startTime = function( )
{
  var time = moment( );
  var hours = time._d.getHours( ).toString( );
  var minutes = time._d.getMinutes( ).toString( );
  var seconds = time._d.getSeconds( ).toString( );
  var ampm;

  if( hours > 12 )
  {
      hours = hours - 12;
      ampm = "PM";
  }
  else
  {
    ampm = "AM";
  }

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
  return hours + ":" + minutes + ":" + seconds + " " + ampm;
};
