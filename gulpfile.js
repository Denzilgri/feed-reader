const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const fontmin = require('gulp-fontmin');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');

gulp.task(
	'default',
	['copy-html', 'copy-fonts', 'styles', 'copy-jasmine', 'scripts-dist'],
	function() {
		gulp.watch('src/css/**/*.css', ['styles']);
		gulp.watch('src/fonts/**/*.js', ['copy-fonts']);
		gulp.watch('src/js/**/*.js', ['scripts-dist']);
		gulp.watch('src/jasmine/**/*.js', ['copy-jasmine']);
		gulp.watch('./src/index.html', ['copy-html']);
		gulp.watch('./dist/index.html');
	}
);

gulp.task('dist', [
	'copy-html',
	'copy-fonts',
    'styles',
    'copy-jasmine',
	'scripts-dist'
]);

gulp.task('copy-jasmine', function() {
	gulp
        .src('src/jasmine/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
		.pipe(gulp.dest('dist/jasmine'));
});

gulp.task('scripts-dist', function() {
	gulp
        .src('src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html', function() {
	gulp.src('./src/index.html').pipe(gulp.dest('./dist'));
});

gulp.task('copy-fonts', function() {
    gulp.src('src/fonts/*')
    .pipe(fontmin())
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('styles', function() {
	gulp
		.src('src/css/**/*.css')
		.pipe(
			autoprefixer({
				browsers: ['last 2 versions']
			})
        )
        .pipe(cleanCSS())
		.pipe(gulp.dest('dist/css'));
});