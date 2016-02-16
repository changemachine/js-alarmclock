var browserify  = require('browserify');
var utilities   = require('gulp-util');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var source      = require('vinyl-source-stream');
var gulp        = require('gulp');
var del         = require('del');

var lib = require('bower-files') ({
  "overrides":{
   "bootstrap" : {
     "main": [
       "less/bootstrap.less",
       "dist/css/bootstrap.css",
       "dist/js/bootstrap.js"
     ]
   }
 }
});

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
  gulp.start('bower');
});

gulp.task('cssBower', function () {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('jsBower', function () {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('bower', ['jsBower', 'cssBower']);
