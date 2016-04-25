'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createModFiles = function createModFiles() {
  var tmpName = this.name;
  var pathArr = tmpName.split(':');
  if(pathArr.length === 2){
    //在页面中创建模块
    var pageName = pathArr[0];
    var compName = pathArr[1];

    var tmpl = 'component/component.js';
    var componentName = compName.toLowerCase();
    if(componentName == 'datalist' || componentName == 'searchform' || componentName == 'dataform' || componentName == 'datainfo'){
      tmpl = 'component/example/'+ componentName +'.js';
    }
    this.appTemplate(
      tmpl,
      path.join('components', pageName, compName + '.js')
    );
    return;
  }
  else {
    console.log('error: you must create commponent with pageName,example: yo admix-react:component pageName:xxx');
  }
};
