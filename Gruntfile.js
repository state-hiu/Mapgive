module.exports = function(grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cssc: {
          build: {
            options: {
              sortSelectors: false,
              sortDeclarations: false,
              sort: false,
              safe: true
            },
            // dest: src
            files: {
              '_assets/css/main.min.css': '_assets/css/main.css'
            }
          }
        },

        cssmin: {
          combine: {
            files: {
              'assets/css/main.min.css': ['_assets/css/bootstrap.min.css', '_assets/css/main.min.css']
            }
          }
        },

        htmlhint: {
          build: {
            options: {
              'attr-lowercase': true,
              'attr-value-double-quotes': true,
              'doctype-first': true,
              'id-class-value': true,
              'id-unique': true,
              'img-alt-require': true,
              'spec-char-escape': true,
              'src-not-empty': true,
              'tag-pair': true,
              'tag-self-close': true,
              'tagname-lowercase': true
            },
            src: ['_site/**/*.html']
          }
        },

        uglify: {
          build: {
            files: {
              'assets/js/main.min.js': ['_assets/js/vendor/bootstrap.min.js', '_assets/js/plugins.js', '_assets/js/vendor/jquery.a11yAccordion.js', '_assets/js/main.js'],
              'assets/js/lt-ie9.min.js': ['_assets/js/vendor/html5shiv.js', '_assets/js/vendor/respond.min.js'],
              'assets/js/modernizr-2.7.0.min.js': ['_assets/js/vendor/modernizr-2.7.0.min.js'],
              'assets/js/jquery-1.10.2.min.js': ['_assets/js/vendor/jquery-1.10.2.min.js']
            }
          }
        },

        sync: {
          main: {
            files: [
              {cwd: '_assets/fonts', src: ['**'], dest: 'assets/fonts/'}
            ]
          }
        },

        imagemin: {
          dynamic: {
            files: [{
              expand: true,
              cwd: '_assets/img',
              src: ['**/*.{png,jpg,jpeg,gif}'],
              dest: 'assets/img'
            }]
          }
        },

        svgmin: {
          dist: {
            files: [{
              expand: true,
              cwd: '_assets/img',
              src: ['**/*.svg'],
              dest: 'assets/img/',
              ext: '.min.svg'
            }]
          }
        },

        compress: {
          main: {
            options: {
              mode: 'gzip'
            },
            files: [
              {expand: true,
               cwd: 'assets/img',
               src: ['*.min.svg'],
               dest: 'assets/img',
               ext: '.svgz'}
            ]
          }
        },

        shell: {
          jekyll: {
            options: {
              stdout: true
            },
            command: 'jekyll build'
          },
          rmAssets: {
            options: {
              stdout: true
            },
            command: 'rm -rf assets/'
          },
          mvTemp: {
            options: {
              stdout: true
            },
            command: 'rm -rf _site && mv temp _site'
          }
        },

        hashres: {
          options: {
            encoding: 'utf8',
            fileNameFormat: '${name}.${hash}.cache.${ext}',
            renameFiles: true
          },
          images: {
            src: [
              'assets/img/**/*.png',
              'assets/img/**/*.jpg',
              'assets/img/**/*.jpeg',
              'assets/img/**/*.svgz'
            ],
            dest: [
              'temp/*.html',
              'temp/**/*.html'
            ]
          },
          js: {
            src: [
              'assets/js/lt-ie9.min.js',
              'assets/js/main.min.js'
            ],
            dest: [
              'temp/*.html',
              'temp/**/*.html'
            ]
          },
          css: {
            src: [
              'assets/css/main.min.css'
            ],
            dest: [
              'temp/*.html',
              'temp/**/*.html'
            ]
          }
        },

        watch: {
          html: {
            files: ['_site/**/*.html'],
            tasks: ['htmlhint']
          },
          js: {
            files: ['_assets/js/**/*.js'],
            tasks: ['uglify']
          },
          css: {
            files: ['_assets/css/*.css'],
            tasks: ['buildcss']
          },
          img: {
            files: ['_assets/img/*.jpg', '_assets/img/*.png', '_assets/img/*.svg'],
            tasks: ['imagmin', 'svgmin']
          },
          imgFonts: {
            files: ['_assets/img/**', '_assets/fonts/**'],
            tasks: ['sync']
          },
          jekyll: {
            files: [
              '*.html',
              '*.yml',
              '*.txt',
              'about-open-mapping/**/*',
              'assets/**/*',
              'commonly-asked-questions/**/*',
              'favicon.*',
              'start-mapping/**/*',
              '_includes/**',
              'site-map/**/*',
              'stories/**/*',
              'the-cause/**/*',
              '_layouts/**/*',
              'transcripts/**/*'
            ],
            tasks: 'shell:jekyll'
          }
        }
    });

    grunt.registerTask('default', [
      'optimages',
      'hashres:images',
      'sync',
      'uglify',
      'buildcss',
      'shell:jekyll',
      'hashres:js',
      'hashres:css',
      'backupSite',
      'shell:mvTemp',
      'htmlhint'
    ]);

    grunt.registerTask('buildcss', [
      'cssc',
      'cssmin'
    ]);

    grunt.registerTask('optimages', [
      'shell:rmAssets',
      'imagemin',
      'svgmin',
      'compress'
    ]);

    grunt.registerTask('backupSite', 'Makes a dated copy of the _site folder in backups', function() {
      var d = new Date,
          wrench = require('wrench'),
          date = [d.getFullYear(),
                  d.getMonth()+1,
                  d.getDate(),
                  d.getHours(),
                  d.getMinutes(),
                  d.getSeconds()].join('');

      wrench.copyDirSyncRecursive('_site', 'backups/' + date);
    });
};

