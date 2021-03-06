// Gulp tasks for Tachyons

// Load plugins
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    basswork = require('gulp-basswork'),
    watch = require('gulp-watch'),
    prefix = require('gulp-autoprefixer'),
    //uncss = require('gulp-uncss'),
    minifyCSS = require('gulp-minify-css'),
    //sass = require('gulp-sass'),
    size = require('gulp-size'),
    rename = require('gulp-rename'),
    csslint = require('gulp-csslint'),
    css = require('css'),
    browserSync = require('browser-sync'),
    browserReload = browserSync.reload;

gulp.task('css', function() {
  gulp.src('./styles/tachyons.css')
    .pipe(basswork())
    .pipe(size({gzip: false, showFiles: true, title:'basswork css'}))
    .pipe(size({gzip: true, showFiles: true, title:'basswork gzipped css'}))
    .pipe(gulp.dest('./css'))
    .pipe(minifyCSS())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(size({gzip: false, showFiles: true, title:'basswork minified'}))
    .pipe(size({gzip: true, showFiles: true, title:'basswork minified'}))
    .pipe(gulp.dest('./css'));
});


// Initialize browser-sync which starts a static server also allows for
// browsers to reload on filesave
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./_site"
        }
    });
});

// Function to call for reloading browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/*
   DEFAULT TASK

 • Process sass then auto-prefixes and lints outputted css
 • Starts a server on port 3000
 • Reloads browsers when you change html or sass files

*/
gulp.task('default', ['css', 'bs-reload', 'browser-sync'], function(){
  gulp.start(['css', 'bs-reload']);
  gulp.watch('styles/*', ['css']);
  gulp.watch(['_site/*',], ['bs-reload']);
});

