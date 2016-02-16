var currentTime = require('./time-interface.js').starTime;

$(document).ready(function( ) {
  $("#time").text(currentTime);
});
