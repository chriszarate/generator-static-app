'use strict'

var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

  askFor: function () {
    var cb = this.async();
    var prompts = [{
      name: 'appName',
      message: 'What would you like to call this application?',
      default:  (this.appname) ? this.appname : 'my-project'
    }];

    this.prompt(prompts, function(answers) {
      var encode = function(str) {return str && str.replace(/\"/g, '\\"');};
      this.appName = encode(answers.appName);
      cb();
    }.bind(this));
  },

  bower: function() {
    this.template('_bower.json', 'bower.json');
  },

  git: function() {
    this.copy('gitignore', '.gitignore');
  },

  grunt: function () {
    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.directory('grunt', 'grunt');
  },

  package: function() {
    this.template('_package.json', 'package.json');
  },

  public: function () {
    this.mkdir('public');
    this.mkdir('public/assets');
    this.mkdir('public/build');
    this.template('public/index.html', 'public/index.html');
  },

  src: function () {
    this.directory('src', 'src');
  },

  tests: function () {
    this.directory('test', 'test');
  },

  install: function () {
    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies({
          skipMessage: this.options['skip-install-message'],
          skipInstall: this.options['skip-install']
        });
      }
    });
  }
});
