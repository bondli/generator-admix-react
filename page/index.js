'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var utils = require('../util.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
  this.name = (this.name).toLowerCase();
  this.name = (this.name).replace('.html','');
  this.pageName = this.name;
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createPageFiles = function createPageFiles() {

  this.name = (this.name).replace('.html','');

  var pkg = fs.readFileSync('./package.json').toString('utf-8');
  var dirName = 'mobile';
  if(pkg && pkg.indexOf('pcweb')>-1){
    dirName = 'pcweb';
  }

  var htmlFile = dirName + '/page.html',
    jsFile = dirName + '/page.js',
    pageApp = dirName + '/pageapp.js',
    scssFile = dirName + '/page.scss';


  this.htmlTemplate(
    htmlFile,
    path.join(this.name + '.html')
  );

  this.appTemplate(
    jsFile,
    path.join('pages', this.name + '.js')
  );

  this.appTemplate(
    scssFile,
    path.join('scss', this.name + '.scss')
  );

  this.appTemplate(
    pageApp,
    path.join('components/' + this.name, 'app.js')
  );

};

