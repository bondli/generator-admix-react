'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var utils = require('./util.js');
var chalk = require('chalk');

var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);

  this.appname = path.basename(process.cwd());
  this.scriptAppName = this._.camelize(this.appname) + utils.appName(this);

  this.cameledName = this._.camelize(this.name);
  this.classedName = this._.classify(this.name);

  //增加对创建组件，actions，store的支持
  var compPath = (this.name).split(':');
  if(compPath.length == 2){
    this.compName = this._.classify(compPath[1]);
  }

  if (typeof this.env.options.appPath === 'undefined') {
    this.env.options.appPath = this.options.appPath;

    if (!this.env.options.appPath) {
      try {
        this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
      } catch (e) {}
    }
    this.env.options.appPath = this.env.options.appPath || 'app';
    this.options.appPath = this.env.options.appPath;
  }


  var sourceRoot = '/templates/javascript';
  this.scriptSuffix = '.js';

  this.sourceRoot(path.join(__dirname, sourceRoot));
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.appTemplate = function (src, dest) {
  yeoman.generators.Base.prototype.template.apply(this, [
    src,
    path.join(this.env.options.appPath, dest.toLowerCase())
  ]);
};

Generator.prototype.htmlTemplate = function (src, dest) {
  yeoman.generators.Base.prototype.template.apply(this, [
    src,
    path.join('./htmls', dest.toLowerCase())
  ]);
};

