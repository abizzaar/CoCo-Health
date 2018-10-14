// Load Grunt
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    postcss: { // Begin Post CSS Plugin
      options: {
        map: false,
        processors: [
      require('autoprefixer')({
            browsers: ['last 2 versions']
          })
    ]
      },
      dist: {
        src: 'dist/**/*.css'
      }
    },
    cssmin: { // Begin CSS Minify Plugin
      target: {
        files: [{
          expand: true,
          src: ['dist/**/*.css'],
    }]
      }
    },
    copy: {
      main: {
        expand: true,
        src: ['**', '!node_modules/**', '!Gruntfile.js', '!dist/**', '!package.json', '!package-lock.json', '!**/*.css', '!Readme.md'],
        dest: 'dist/',
      },
    },
    watch: { // Compile everything into one task with Watch Plugin
      css: {
        files: ['**/*.css', '**/*.html', '!dist/**'],
        tasks: ['postcss', 'cssmin', 'copy']
      }
    }
  });
  // Load Grunt plugins
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register Grunt tasks
  grunt.registerTask('default', ['watch']);
};