var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

//tasks
// //1>> compile sass to css and auto-inject into browser

function style() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
}

function script() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream());
}

//set up watch task
function watch() {

    //set base directory for browsersync
    browserSync.init({
            server: {
                baseDir: "src",
                index: "/index.html"
            }
        }

    );

    //define our watch tasks
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], style);
    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/js/*.js').on('change', browserSync.reload);


}

exports.style = style;
exports.script = script;
exports.watch = watch;