// loads various gulp modules
var gulp = require('gulp');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

gulp.task('concatContrib', function() {
  gulp.src([
    'css/main.css',
    'css/normalize.css',
    'css/screen.css',
    'css/syntax.css',
    'css/royalslider.css',
    'css/skins/default-inverted/rs-default-inverted.css',
    'css/foundation.min.css',
    'css/github.css'
    ])
  .pipe(cssnano())
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
  .pipe(concat('style.min.css'))
  .pipe(gulp.dest('css'))
});

gulp.task('minImg', () => {
    return gulp.src('img/surplace_analytics.jpg')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('img'));
});