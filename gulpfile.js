var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass')(require('sass'));
var del = require('del');
var open = require('gulp-open');

var way = {
  wayDist: 'dist',
  wayStyles: 'src/styles/**/*.scss',
  wayIndex: 'src/index.html',
  wayFonts: 'src/fonts/**/*',
}

function index() {
  return gulp.src(way.wayIndex)
  .pipe(gulp.dest(way.wayDist))
  .pipe(connect.reload())
}

function styles() {
  return gulp.src(way.wayStyles)
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(way.wayDist + '/css'))
  .pipe(connect.reload())
}

  function fonts(){
    return gulp.src(way.wayFonts)
    .pipe (gulp.dest(way.wayDist + '/fonts'))
  }

  function cleanDist () {
    return del(way.wayDist)
  }

  function watch() {
    gulp.watch(way.wayStyles, styles)
    gulp.watch(way.wayIndex, index)
  }

  function server() {
    connect.server({
      root: way.wayDist,
      livereload: true,
      port: '8080',
      host: 'localhost',
    })
    return
  }

  function openSite() {
    gulp.src('dist/index.html')
    .pipe(open({
      uri: 'http://localhost:8080',
      app: 'google-chrome'
    }))
  }

  exports.default = gulp.series(
    cleanDist,
    gulp.parallel(index, styles, fonts),
    gulp.parallel(server, watch, openSite)
  )
