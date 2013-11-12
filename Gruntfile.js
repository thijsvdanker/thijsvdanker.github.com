module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/<%= pkg.name %>.js',
        dest: '_build/js/<%= pkg.name %>.min.js'
      }
    },
    // gzip assets 1-to-1 for production
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        files: [
          // Each of the files in the src/ folder will be output to
          // the dist/ folder each with the extension .gz.js
          {expand: true, cwd: 'js/', src: ['**/*'], dest: 'deploy/js/'},
          {expand: true, cwd: 'css/', src: ['**/*.css'], dest: 'deploy/css/'}
        ]
      }
    },
    s3: {
      aws: grunt.file.readJSON('/home/thijs/.grunt/grunt-aws.json'),
      options: {
        key: '<%= s3.aws.key %>',
        secret: '<%= s3.aws.secret %>',
        bucket: '<%= s3.aws.bucket %>',
        access: 'authenticated-read',
        headers: {
          // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
          "Cache-Control": "max-age=630720000, public",
        },
        gzip: false
      },
      dev: {
        // These options override the defaults
        options: {
          encodePaths: true,
          maxOperations: 50
        },
        // Files to be uploaded.
        upload: [
          {
            src: 'deploy/css/contrib/*',
            dest: 'css/contrib/',
            options: {
              headers: {
                // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
                "Cache-Control": "max-age=630720000, public",
                "Content-Type": "text/css",
                "Content-Encoding": "gzip"
              }
            }
          },
          {
            src: 'css/contrib/fonts/*',
            dest: 'css/contrib/fonts/',
            options: {
              gzip: false
            }
          },
          {
            src: 'css/img/*',
            dest: 'css/img/',
            options: {
              gzip: false
            }
          },
          {
            src: 'deploy/css/skins/default-inverted/*',
            dest: 'css/skins/default-inverted/',
            options: {
              headers: {
                // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
                "Cache-Control": "max-age=630720000, public",
                "Content-Type": "text/css",
                "Content-Encoding": "gzip"
              }
            }
          },
          {
            src: 'deploy/css/skins/preloaders/*',
            dest: 'css/skins/preloaders/',
            options: {
              headers: {
                // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
                "Cache-Control": "max-age=630720000, public",
                "Content-Type": "text/css",
                "Content-Encoding": "gzip"
              }
            }
          },
          {
            src: 'deploy/css/*.gz',
            dest: 'css/',
            options: {
              headers: {
                // One hour on all custom css cache policy (60 * 60)
                "Cache-Control": "max-age=3600, public",
                "Content-Type": "text/css",
                "Content-Encoding": "gzip"
              }
            }
          },
          {
            src: 'deploy/js/vendor/*.gz',
            dest: 'js/contrib/',
            options: {
              headers: {
                // One hour on all custom css cache policy (60 * 60)
                "Cache-Control": "max-age=630720000, public",
                "Content-Type": "application/x-javascript",
                "Content-Encoding": "gzip"
              }
            }
          },
          {
            src: 'deploy/js/foundation/*.gz',
            dest: 'js/contrib/foundation/',
            options: {
              headers: {
                // One hour on all custom css cache policy (60 * 60)
                "Cache-Control": "max-age=630720000, public",
                "Content-Type": "application/x-javascript",
                "Content-Encoding": "gzip"
              }
            }
          },
          {
            src: 'deploy/js/vendor/royalslider/*.gz',
            dest: 'js/contrib/royalslider/',
            options: {
              headers: {
                // One hour on all custom css cache policy (60 * 60)
                "Cache-Control": "max-age=630720000, public",
                "Content-Type": "application/x-javascript",
                "Content-Encoding": "gzip"
              }
            }
          }
        ],
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-s3');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'compress', 's3']);


};