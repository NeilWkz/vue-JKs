var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    rename      = require('gulp-rename'),
    cssmin      = require('gulp-minify-css'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    jshint      = require('gulp-jshint'),
    cache       = require('gulp-cached'),
    prefix      = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
   // minifyHTML  = require('gulp-minify-html'),
    size        = require('gulp-size'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify');


gulp.task('scss', function() {
    var onError = function(err) {
      notify.onError({
          title:    "Gulp",
          subtitle: "Failure!",
          message:  "Error: <%= error.message %>",
          sound:    "Beep"
      })(err);
      this.emit('end');
  };

  return gulp.src('scss/*.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(prefix())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('css'))
    .pipe(reload({stream:true}))
    .pipe(cssmin())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css'))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});


// gulp.task('js', function() {
//   gulp.src('js/*.js')
//     .pipe(uglify())
//     .pipe(size({ gzip: true, showFiles: true }))
//     .pipe(concat('j.js'))
//     .pipe(gulp.dest('/js'))
//     .pipe(reload({stream:true}));
// });


gulp.task('minify-html', function() {
    var opts = {
      comments:true,
      spare:true
    };

  gulp.src('./*.html')
    // .pipe(minifyHTML(opts))
    // .pipe(gulp.dest('dist/'))
    .pipe(reload({stream:true}));
});

// gulp.task('jshint', function() {
//   gulp.src('js/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'));
// });

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['scss']);
  // gulp.watch('js/*.js', ['jshint', 'js']);
  gulp.watch('./*.html', ['minify-html']);
  gulp.watch('images/*', ['imgmin']);
});

gulp.task('imgmin', function () {
    return gulp.src('images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('/img'));
});

gulp.task('default', ['browser-sync', 'imgmin', 'scss', 'watch']);