// GULP 4
const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
function style() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
};

// Move the javascript files into our /src/js folder
function js() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
};

// Static Server + watching scss/html files
function serve() {

    browserSync.init({
        server: "./src"  
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], style);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'], js);
};

exports.style = style;
exports.js = js;
exports.serve = serve;