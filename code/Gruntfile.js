module.exports = function (grunt) {
	grunt.initConfig({
		
		// WATCH task config
		watch: {
			// sass: {
			// 	files: ['source/**/*.sass', 'source/**/*.scss'],
			// 	tasks: ['sass', 'autoprefixer', 'browserSync']
			// },

			css: {
				files: ['source/**/*.sass', 'source/**/*.scss'],
				tasks: ['sass', 'autoprefixer']
			},
			
			pug: {
				files: ['source/**/*.pug'],
				tasks: ['pug']
			},

			// browserSync: {
			// 	files: ['app/**/*.css', 'app/**/*.html'],
			// 	tasks: ['browserSync']
			// },

		},

		// SASS task config
		sass: {
			dev: {
				files: {
					// destination				// source file
					'app/css/app.css':			'source/scss/styles.scss',

				},
				options: {
					style: 'compressed',
				}
			}
		},

		// AUTOPREFIXER
		autoprefixer: {
			dev: {
				files: {
					'app/css/app.css': 'app/css/app.css'
				}
			}
		},

		// PUG
		pug: {
			compile: {
				options: {
					client: false,
					pretty: true,
					data: {
						data: grunt.file.readJSON('../data/recommendations.json')
					}
				},
				files: [ {
					cwd: 'source',
					src: '**/*.pug',
					dest: 'app/',
					expand: true,
					ext: '.html'
				}]
			}
		},


		copy: {
			//app: {
			//	files: [{
			//			src: [ 'js/*','style/**/*.css', '!**/*.jade', 'img/**/*'],
			//			dest: './app'
			//		}]
			//}
			app: {
				cwd: 'sources',
				src: [ 'js/*','style/**/*.css', '!**/*.jade', 'img/**/*' ],
				dest: 'app',
				expand: true
			}
		},
		
		
		clean: {
			app: ['./app/**']
		},



		// Using the BrowserSync Server for your static .html files.
		browserSync: {
			default_options: {
				bsFiles: {
					src: [
					'app/css/*.css',
					'app/*.html'
					// '*.pug',
					]
				},
				options: {
					watchTask: true,
					server: {
						baseDir: './app'
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.registerTask('default', ['browserSync', 'watch']);
};