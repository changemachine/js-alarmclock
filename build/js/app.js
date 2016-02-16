(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

  var start;
  if( hours < 10 )
  {
    start = "0" + hours;
    hours = start;
  }

  if( minutes < 10 )
  {
    start = "0" + minutes;
    minutes = start;
  }

  if( seconds < 10 )
  {
    start = "0" + seconds;
    seconds = start;
  }
  return hours + ":" + minutes + ":" + seconds + " " + ampm;
};

},{}],2:[function(require,module,exports){

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

},{}],3:[function(require,module,exports){
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

},{"./../js/time-interface.js":1,"./../js/timer.js":2}]},{},[3]);
