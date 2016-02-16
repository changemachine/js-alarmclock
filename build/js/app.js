(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var currentTime = require('./time-interface.js').starTime;

$(document).ready(function( ) {
  $("#time").text(currentTime);
});

},{"./time-interface.js":2}],2:[function(require,module,exports){
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

},{}]},{},[1]);
