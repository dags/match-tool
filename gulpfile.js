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
    gulp.src('./node_modules/es6-shim/es6-shim.min.js').pipe(gulp.dest('./dist/vendor/es6-shim'));    
    gulp.src('./node_modules/angular2/bundles/angular2-polyfills.js').pipe(gulp.dest('./dist/vendor/angular2/'));
    gulp.src('./node_modules/angular2/bundles/angular2.dev.js').pipe(gulp.dest('./dist/vendor/angular2/'));
    gulp.src('./node_modules/angular2/bundles/http.js').pipe(gulp.dest('./dist/vendor/angular2/'));
    gulp.src('./node_modules/angular2/bundles/router.js').pipe(gulp.dest('./dist/vendor/angular2/'));
    gulp.src('./node_modules/angular2/bundles/testing.dev.js').pipe(gulp.dest('./dist/vendor/angular2/'));
    gulp.src('./node_modules/angular2/bundles/upgrade.js').pipe(gulp.dest('./dist/vendor/angular2/'));
    gulp.src('./node_modules/systemjs/dist/system.src.js').pipe(gulp.dest('./dist/vendor/systemjs/'));
    gulp.src('./node_modules/systemjs/dist/system-polyfills.js').pipe(gulp.dest('./dist/vendor/systemjs/'));
    gulp.src('./node_modules/rxjs/bundles/Rx.js').pipe(gulp.dest('./dist/vendor/rxjs/'));
    gulp.src('./node_modules/ng2-bootstrap/bundles/ng2-bootstrap.min.js').pipe(gulp.dest('./dist/vendor/ng2-bootstrap/'));
    gulp.src('./node_modules/moment/moment.js').pipe(gulp.dest('./dist/vendor/moment/'));
    gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css').pipe(gulp.dest('./dist/vendor/bootstrap/css'));
    gulp.src('./node_modules/bootstrap/dist/css/bootstrap-theme.min.css').pipe(gulp.dest('./dist/vendor/bootstrap/css'));
    gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js').pipe(gulp.dest('./dist/vendor/bootstrap/js'));
    gulp.src('./node_modules/bootstrap/dist/fonts/*.*').pipe(gulp.dest('./dist/vendor/bootstrap/fonts'));
    gulp.src('./node_modules/jquery/dist/jquery.min.js').pipe(gulp.dest('./dist/vendor/jquery'));    
    gulp.src('./node_modules/font-awesome/css/font-awesome.min.css').pipe(gulp.dest('./dist/vendor/font-awesome/css'));
    gulp.src('./node_modules/font-awesome/fonts/*.*').pipe(gulp.dest('./dist/vendor/font-awesome/fonts'));
});

gulp.task('watch', function () {
    gulp.watch(['./src/**/*.*'], ['build']);
});

