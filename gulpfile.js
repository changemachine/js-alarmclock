var browserify  = require('browserify');
var utilities   = require('gulp-util');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var source      = require('vinyl-source-stream');
var gulp        = require('gulp');
var del         = require('del');

var buildProduction = utilities.env.production;

gulp.task("time", function( ) {
  console.log("time works");
});

gulp.task('jsBrowserify', function( ) {
  return browserify({ entries: ['./js/browser.js'] })
    .bundle( )
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('concatInterface', function( ) {
  return gulp.src(['./js/browser.js', './js/signup-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

gulp.task('jsBrowserify', ['concatInterface'] , function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});

gulp.task("clean", function(){
  return del(['build', 'tmp']);
});

gulp.task("build", ['clean'], function(){
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
});
