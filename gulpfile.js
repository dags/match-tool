var gulp = require('gulp');
var ts = require('gulp-typescript');
var less = require('gulp-less');
var path = require('path');
var webserver = require('gulp-webserver');
var Server = require('karma').Server;
var del = require('del');

var tsProject = ts.createProject('./tsconfig.json');

gulp.task('serve', function () {
    gulp.src('dist').pipe(webserver({
        livereload: true,
        directoryListing: false,
        open: true
    }));
});

gulp.task('build',['base-files','less','typescript','cli-lib']);

gulp.task('clean', function(cb){
    del('./dist/**/*',cb);
});

gulp.task('run',['watch','serve']);

gulp.task('base-files', function () {
  return gulp.src(['./src/**/*.html','./src/**/*.css','./src/**/*.png','./src/**/*.jpg','./src/system.config.js'])
    .pipe(gulp.dest('./dist/'));
});

gulp.task('less', function () {
    return gulp.src('./src/**/*.less').pipe(less(
    )).pipe(gulp.dest('./dist/'));
});

gulp.task('typescript', function () {

    var tsResult = tsProject.src().pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('./dist/'));
});

gulp.task('cli-lib',function(){
    gulp.src('./node_modules/es6-shim/**/*.*').pipe(gulp.dest('./dist/vendor/es6-shim'));    
    gulp.src('./node_modules/@angular/**/*.*').pipe(gulp.dest('./dist/vendor/angular2/'));
    gulp.src('./node_modules/systemjs/dist/**/*.*').pipe(gulp.dest('./dist/vendor/systemjs/'));
    gulp.src('./node_modules/rxjs/**/*.*').pipe(gulp.dest('./dist/vendor/rxjs/'));
    gulp.src('./node_modules/ng2-bootstrap/bundles/**/*.*').pipe(gulp.dest('./dist/vendor/ng2-bootstrap/'));
    gulp.src('./node_modules/moment/**/*.*').pipe(gulp.dest('./dist/vendor/moment/'));
    gulp.src('./node_modules/bootstrap/dist/**/*.*').pipe(gulp.dest('./dist/vendor/bootstrap'));
    gulp.src('./node_modules/jquery/dist/**/*.*').pipe(gulp.dest('./dist/vendor/jquery'));    
    gulp.src('./node_modules/font-awesome/**/*.*').pipe(gulp.dest('./dist/vendor/font-awesome'));
});

gulp.task('watch', function () {
    gulp.watch(['./src/**/*.*'], ['build']);
});

