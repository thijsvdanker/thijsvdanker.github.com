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
          {expand: true, cwd: 'js/', src: ['**/*'], dest: '_build/js/'},
          {expand: true, cwd: 'css/', src: ['**/*'], dest: '_build/css/'}
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
        }
      },
      dev: {
        // These options override the defaults
        options: {
          encodePaths: true,
          maxOperations: 20
        },
        // Files to be uploaded.
        upload: [
          {
            src: '_build/css/vendor/*',
            dest: 'css/vendor/',
            options: {
              gzip: true
            }
          },
          {
            src: '_build/css/fonts/*',
            dest: 'css/fonts/',
            options: {
              gzip: true
            }
          },
          {
            src: '_build/css/skins/default-inverted/*',
            dest: 'css/skins/default-inverted/',
            options: {
              gzip: true
            }
          },
          {
            src: '_build/css/skins/preloaders/*',
            dest: 'css/skins/preloaders/',
            options: {
              gzip: true
            }
          },
          {
            src: '_build/css/*.gz',
            dest: 'css/',
            options: {
              gzip: true,
              headers: {
                // One hour on all custom css cache policy (60 * 60)
                "Cache-Control": "max-age=3600, public",
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