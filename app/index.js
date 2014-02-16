'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var execSync = require('execSync');


var WpProjectGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.generatePassword = function (length) {
      length = typeof length !== 'undefined' ? length : 64;
      var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' + '!@#$%^&*()' + '-_ []{}<>~`+=,.;:/?|';
      var password = '';

      for (var i = 0; i < length; i++) {
        password += chars.substr( Math.floor(Math.random() * (chars.length)), 1);
        // password += substr($chars, rand(0, strlen($chars) - 1), 1);
      }
      return password;
    }

    this.on('end', function () {
      if (!this.options['skip-install']) {
        // this.npmInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('You\'re using the fantastic Wp-Starter generator.'));

    var prompts = [{
      name: 'wpHome',
      message: 'What will be the url of your wordpress website?'
    }, {
      type: 'confirm',
      name: 'generateSalt',
      message: 'Generalt Salt?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.wpHome = props.wpHome;
      this.generateSalt = props.generateSalt;

      done();
    }.bind(this));
  },

  app: function () {
    this.salts = {
      authKey: '',
      secureAuthKey: '',
      loggedInKey: '',
      nonceKey: '',
      authSalt: '',
      secureAuthSalt: '',
      loggedInSalt: '',
      nonceSalt: ''
    };

    if (this.generateSalt) {
      for (var index in this.salts) {
        this.salts[index] = this.generatePassword();
      }
    }

    this.template('wp-config.php', 'wp-config.php');
    this.template('index.php', 'index.php');
  },

  project: function () {
    this.template('composer.json', 'composer.json');
    this.copy('gitignore', '.gitignore');
  },

  installComposer: function () {
    var done = this.async();

    this.fetch('https://getcomposer.org/composer.phar', 'vendor/bin', function (err) {
      if (err) {
        done(err);
      }
      execSync.run('php vendor/bin/composer.phar install');
      done();
    });
  }

});

module.exports = WpProjectGenerator;
