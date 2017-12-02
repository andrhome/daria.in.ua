const gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    rimraf = require('rimraf'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    reload = browserSync.reload;

const path = {
    build: {
        html: 'build/',
        script: 'build/js/',
        style: 'build/css/',
        image: 'build/images/',
        fonts: 'build/fonts/',
        vendor: 'build/vendor/'
    },
    src: {
        html: 'src/*.html',
        script: 'src/js/main.js',
        style: 'src/scss/main.scss',
        image: 'src/images/**/**/*.*',
        fonts: ['src/fonts/**/*.*', '!src/fonts/**/selection.json'],
        vendor: 'src/vendor/**/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        script: 'src/js/**/*.js',
        style: 'src/scss/**/*.scss',
        image: 'src/images/**/**/*.*',
        fonts: 'src/fonts/**/*.*',
        vendor: 'src/vendor/**/**/*.*'
    },
    clean: './build'
};

const config = {
    server: {
        baseDir: './build'
    },
    host: 'localhost',
    port: 3000,
    logPrefix: 'gulp'
};

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('js:build', function () {
    gulp.src(path.src.script)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.script))
        .pipe(reload({
            stream: true
        }))
});

gulp.task('css:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer({
            browsers: ['last 7 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.style))
        .pipe(reload({
            stream: true
        }))
});

gulp.task('img:build', function () {
    return gulp.src(path.src.image)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 7}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(path.build.image))
        .pipe(reload({
            stream: true
        }))
});

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('vendor:build', function () {
    gulp.src(path.src.vendor)
        .pipe(gulp.dest(path.build.vendor))
});

gulp.task('build', [
    'html:build',
    'css:build',
    'js:build',
    'img:build',
    'fonts:build',
    'vendor:build'
]);

gulp.task('watch', function () {
    watch([path.watch.html], function () {
        gulp.start('html:build');
    });
    watch([path.watch.style], function () {
        gulp.start('css:build');
    });
    watch([path.watch.script], function () {
        gulp.start('js:build');
    });
    watch([path.watch.image], function () {
        gulp.start('img:build');
    });
    watch([path.watch.fonts], function () {
        gulp.start('fonts:build');
    });
    watch([path.watch.vendor], function () {
        gulp.start('vendor:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb)
});

gulp.task('default', ['build', 'webserver', 'watch']);