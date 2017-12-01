'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var gulpIf = require('gulp-if');
var notify = require("gulp-notify");
var autoprefixer = require("gulp-autoprefixer");
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var cacheBust = require('gulp-cache-bust');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var fs = require('fs');
var filter = require('gulp-filter');
var svgo = require('gulp-svgo');
var rigger = require('gulp-rigger');
var browserSync = require("browser-sync"),
    reload = browserSync.reload;

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

var path = {
  dist: {
    html: 'dist/',
    js: 'dist/js/',
    css: 'dist/css/',
    img: 'dist/images/',
    fonts: 'dist/fonts/',
    png:'dist/images/png/'
  },
  src: {
    html: 'src/*.html',
    js: 'src/js/**/*.js',
    scss: 'src/scss/*.scss',
    img: 'src/images/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    scss: 'src/scss/**/*.scss',
    img: 'src/images/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  clean: './dist'
};
var configsvg = {
  mode: {
    symbol: true
  }
};

gulp.task('html', function () {
  return gulp.src(path.src.html)
      .pipe(rigger())
      .pipe(gulp.dest(path.dist.html))
      .pipe(reload({stream: true}));
});

gulp.task('sass', function () {
  return gulp.src(path.src.scss)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on('error', notify.onError(function (err) {
        return {
          title: "SASS",
          message: err.message
        };
      }))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(cssnano())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
      .pipe(gulp.dest(path.dist.css))
      .pipe(reload({stream: true}));
});


gulp.task('image', function () {
  return gulp.src(path.src.img)
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()],
        interlaced: true
      }))
      .pipe(gulp.dest(path.dist.img))
      .pipe(reload({stream: true}));
});



gulp.task('js', function () {
  return gulp.src(path.src.js)
      // .pipe(concat('main.min.js'))
      .pipe(rigger())
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.dist.js))
      .pipe(reload({stream: true}));

});

gulp.task('font', function () {
  return gulp.src(path.src.fonts)
      .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('clean', function () {
  return del(path.dist.html);
});

gulp.task('watch', function () {
  gulp.watch(path.watch.html, gulp.series('html'));
  gulp.watch(path.watch.img, gulp.series('image'));
  gulp.watch(path.watch.scss, gulp.series('sass'));
  gulp.watch(path.watch.js, gulp.series('js'));
  gulp.watch(path.watch.fonts, gulp.series('font'));
});

var config = {
  server: {
    baseDir: "./dist"
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: "Frontend"
};
gulp.task('webserver', function () {
  browserSync(config);
});


gulp.task('cacheBust', gulp.series('sass', 'js'), function () {
  return gulp.src('dist/index.html')
      .pipe(cachebust())
      .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel(gulp.series('html'), 'image', 'font', 'sass', 'js')
));

gulp.task('default', gulp.series('build', gulp.parallel('webserver', 'watch')));