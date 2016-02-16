
exports.createTimer = function( time, callback, name )
{
  new Timer( time, callback, name );
}

// This is up to you to manage, as in you remove them when done
var timers = [];

// Remove the timer from the timers array
function removeTimer( timer )
{
    var index = timers.indexOf( timer );
    if( index !== -1 )
    {
        timers.splice( index, 1 );
    }
}

// Returns the timer object by its name (up to you to manage)
Timer.prototype.getTimerByName = function( timername )
{
    for( var i = 0; i < timers.length; i++ )
    {
        if( timers[ i ].timername === timername )
        {
            return timers[ i ];
        }
    }
    return null;
}

// Does a timer exist
Timer.prototype.exists = function( timer )
{
    for( var i = 0; i < timers.length; i++ )
    {
        if( timer === timers[ i ] )
        {
            return true;
        }
    }
    return false;
}

// Does the timer exist by name -- if for some reason you dont have a reference but remember the name
Timer.prototype.existsByName = function( timername )
{
    for( var i = 0; i < timers.length; i++ )
    {
        if( timername === timers[ i ].timername )
        {
            return true;
        }
    }
    return false;
}

// Timer object
// Time : Length of timer, in milliseconds
// Callback : function / object to call when timer is done
// Timername : name of timer
function Timer( time, callback, timername )
{
    this.time = time;
    this.callback = callback;
    this.timername = timername;
    this.bRunning = true;
    this.timerPool;
    startTimer( this );

    function startTimer( toStart )
    {
        if( !toStart.exists( toStart ) )
        {
            var interv = function( t )
            {
                callback( );
                removeTimer( toStart );
            }
            timers.push( toStart );
            setTimeout( interv, time );
        }
    }
};
