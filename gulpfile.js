/*
 * (C) Copyright 2015 Ralf Geschke <ralf@kuerbis.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */


var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var size = require('gulp-size');
var sourcemaps = require('gulp-sourcemaps');
var reactify = require('reactify');


var config = {
    bowerDir: './bower_components',
    publicDir: './public',
    css: {
        options: {
            keepSpecialComments: 0
        }
    }
};

gulp.task('bootstrap_fonts', function () {
    return gulp.src([
        config.bowerDir + '/bootstrap-sass/assets/fonts/**/*',
    ])
            .pipe(gulp.dest(config.publicDir + '/fonts'));
});

gulp.task('styles', function () {
    return gulp.src([
        config.bowerDir + '/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css',
        config.bowerDir + '/nvd3/build/nv.d3.css',
        'src/**/*.css',
    ])
            .pipe(concat('styles.css'))
            .pipe(minifycss(config.css.options))
            .pipe(gulp.dest(config.publicDir + '/css'))
            .pipe(size());
});

gulp.task('scripts', function () {
    gulp.src('src/app.js')
            .pipe(browserify({
                insertGlobals: false,
                debug: true,
                transform: [reactify]
            }))
       //     .pipe(uglify())
            .pipe(gulp.dest(config.publicDir + '/js'));
});


gulp.task('libraries_js', function () {
    return gulp.src([
        config.bowerDir + '/jquery/dist/jquery.min.js',
        config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.js',
        config.bowerDir + '/moment/min/moment-with-locales.js',
        config.bowerDir + '/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
        config.bowerDir + '/d3/d3.js',
        config.bowerDir + '/nvd3/build/nv.d3.js',
    ])
            .pipe(concat('libraries.js'))
            .pipe(uglify({
                compress: true,
                outSourceMap: true,
            }))
            .pipe(gulp.dest(config.publicDir + '/js'));
});

gulp.task('bootstrap_custom', function () {
    return gulp.src('src/css/bootstrap-custom.scss')
            //.pipe(sourcemaps.init())
            .pipe(sass({
                style: 'compressed',
                includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
            }))
            //.pipe(sourcemaps.write())
            .pipe(minifycss(config.css.options))
            .pipe(gulp.dest(config.publicDir + '/css'))
            .pipe(size());

});

gulp.task('watch', function () {
    gulp.watch(['src/**/*.js', 'src/**/*.jsx'], ['scripts']);
    gulp.watch('src/**/*.css', ['styles']);
    gulp.watch('src/css/*.scss', ['bootstrap_custom']);
    
});

gulp.task('default', ['scripts', 'styles', 'bootstrap_custom', 'libraries_js', 'bootstrap_fonts']);
