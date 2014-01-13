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

        img: {
          main: {
            src: ['_assets/img/**/*.png', '_assets/img/**/*.jpg', '_assets/img/**/*.jpeg'],
            dest: 'assets/img'
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
              {expand: true, src: ['assets/img/*.min.svg'], dest: 'assets/img/', ext: '.svgz'}
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
            command: 'mv temp _site'
          }
        },

        copy: {
          main: {
            expand: true,
            src: '_site/*',
            dest: 'backups/',
            rename: function() {
              var path = require('path');
              var d = new Date;
              var date = [d.getFullYear(),
                          d.getMonth()+1,
                          d.getDate()].join('')+
                         [d.getHours(),
                          d.getMinutes(),
                          d.getSeconds()].join('');
              return path.join(dest, date);
            }
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
              '*.html',
              '_includes/**/.html',
              '_layouts/**/.html',
              'about-open-mapping/**/*.html',
              'commonly-asked-question/**/*.html',
              'site-map/**/*.html',
              'start-mapping/**/*.html',
              'stories/**/*.html',
              'stories/**/*.md',
              'the-cause/**/*.html',
              'transcripts/**/*.html',
              '_assets/css/*.css',
              '_assets/js/*.js'
            ]
          },
          js: {
            src: [
              'assets/js/lt-ie9.min.js',
              'assets/js/main.min.js'
            ],
            dest: '_layouts/default.html'
          },
          css: {
            src: [
              'assets/css/main.min.css'
            ],
            dest: '_layouts/default.html'
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
            tasks: ['img', 'svgmin']
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
      'hashres:img',
      'sync',
      'uglify',
      'buildcss',
      'shell:jekyll',
      'hashres:js',
      'hashres:css',
      'copy',
      'shell:mvTemp',
      'htmlhint'
    ]);

    grunt.registerTask('buildcss', [
      'cssc',
      'cssmin'
    ]);

    grunt.registerTask('optimages', [
      'shell:rmAssets',
      'img',
      'svgmin',
      'compress'
    ]);
};

