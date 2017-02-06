let gulp = require('gulp');
let plumber = require('gulp-plumber');
let sourcemaps = require('gulp-sourcemaps');
let concat = require('gulp-concat')
let webpackStream = require('webpack-stream');
let webpack = webpackStream.webpack;
let named = require('vinyl-named');
let clean = require('gulp-clean');
let browserSync = require('browser-sync');

gulp.task('html', () => {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('css', () => {
    gulp.src('src/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('app', () => {
    let config = {
        devtool: 'sourcemap',
        module: {
            loaders: [{
                test: /\.js$/,
                exclude: [/src\/app/, /node_modules/],
                loader: 'babel-loader?presets[]=es2015'
            }]
        },
        plugins: [
            new webpack.NoErrorsPlugin()
        ]
    };
    return gulp.src('src/app/main.js')
        .pipe(named())
        .pipe(webpackStream(config))
        .pipe(gulp.dest('dist/app'))
});

gulp.task('clean', () => {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('builder', ['app', 'html', 'css']);

gulp.task('build', ['clean'], () => {
    return gulp.start('builder');
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/**/*.js', ['app']);
    gulp.watch('src/**/*.css', ['css']);
    gulp.watch('dist/**/*').on('change', browserSync.reload);
});

gulp.task('serve', () => {
    browserSync({
        port: 9000,
        server: {
            baseDir: 'dist'
        }
    });
});

