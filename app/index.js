'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var myUtils = require('../util.js');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var wiredep = require('wiredep');
var chalk = require('chalk');

var Generator = module.exports = function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());
  //this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

  this.option('app-suffix', {
    desc: 'Allow a custom suffix to be added to the module name',
    type: String,
    required: 'false'
  });
  this.env.options['app-suffix'] = this.options['app-suffix'];
  this.scriptAppName = this.appname + myUtils.appName(this);

  if (typeof this.env.options.appPath === 'undefined') {
    this.option('appPath', {
      desc: 'path/to/app is now accepted to choose where to write the files.'
    });

    this.env.options.appPath = this.options.appPath;

    if (!this.env.options.appPath) {
      try {
        this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
      } catch (e) {}
    }

    this.env.options.appPath = this.env.options.appPath || 'app';
    this.options.appPath = this.env.options.appPath;
  }

  this.appPath = this.env.options.appPath;

  //生成项目平台参数，默认是pcweb，调用如下：
  //yo admix-react --pt=pcweb
  //yo admix-react --pt=mobile
  this.env.options.pt = this.options.pt || 'pcweb';
  this.pt = this.env.options.pt;

  if(this.pt == 'pcweb'){
    this.hookFor('admix-react:main', {
      args: ['header']
    });

    this.hookFor('admix-react:main', {
      args: ['sidebar']
    });

    this.hookFor('admix-react:main', {
      args: ['footer']
    });
  }

  this.on('end', function () {
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      skipMessage: this.options['skip-message']
    });

    var enabledComponents = [];

  });

  this.pkg = require('../package.json');
  this.sourceRoot(path.join(__dirname, '../templates/common'));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function welcome() {
  if (!this.options['skip-welcome-message']) {
    this.log(yosay());
    this.log(
      chalk.magenta(
        'Out of the box I include react, reflux and bootstrap recommended modules.' +
        '\n'
      )
    );
  }
};

Generator.prototype.packageFiles = function packageFiles() {
  this.template('_bowerrc', '.bowerrc');
  this.template('_bower.json', 'bower.json');
  this.template('_package.json', 'package.json');
  this.template('_gulpfile.js', 'gulpfile.js');
  this.template('_README.md', 'README.md');
  this.template('_changelog.md', 'changelog.md');
  this.template('_editorconfig', '.editorconfig');
  this.template('_gitattributes', '.gitattributes');
  this.template('_jshintrc', '.jshintrc');
  this.template('_gitignore', '.gitignore');

  fs.mkdir('app');
  fs.mkdir('htmls');

  fs.mkdir('app/actions');
  fs.mkdir('app/components');
  fs.mkdir('app/pages');
  fs.mkdir('app/scss');
  fs.mkdir('app/stores');

  fs.mkdir('htmls/data');

  this.template('common.scss', 'app/components/common/common.scss');
  this.template('mixins.scss', 'app/components/common/mixins.scss');
  this.template(this.env.options.pt + '/apimap.js', 'app/components/common/apimap.js');
  if(this.env.options.pt == 'pcweb'){
    this.template(this.env.options.pt + '/layout.scss', 'app/components/common/layout.scss');
    this.template(this.env.options.pt + '/utils.js', 'app/components/common/utils.js');
  }

};

Generator.prototype.showGuidance = function showGuidance() {
  var guidance =
    '\nNow that everything is set up, you\'ll need to execute a build. ' +
    '\nThis is done by running' +
    '\n  gulp build' +
    '\n' +
    '\nWork with your files by using' +
    '\n  gulp' +
    '\n' +
    '\nThis sets a watch on your files and also opens your project in ' +
    '\na web browser using live-reload, so that any changes you make are ' +
    '\ninstantly visible.'

  console.log(guidance);
};

