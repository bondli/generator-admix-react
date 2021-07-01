# admix generator


> Yeoman generator for admix project - lets you quickly set up a project with sensible defaults and best practices.

test test test

**构建成功后的工程目录结构说明：**

```
|- project-name/                #项目目录
  |- app/
    |- actions                  #actions
    |- components               #项目组件
    |- pages                    #页面JS
    |- scss                     #页面样式
    |- stores                   #stores
  |- bower_components           #外部组件
  |- htmls                      #页面文件
  |- htmls-dist                 #打包后的页面文件
  |- node_modules
  |- .bowerrc
  |- .editorconfig
  |- .gitattributes
  |- .gitignore
  |- .jshintrc
  |- bower.json
  |- changelog.md
  |- gulpfile.js
  |- package.json
  |- README.md

```

## Usage

Install `generator-admix-react`:
```
npm install -g generator-admix-react
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo admix-react`, optionally passing an app name:
```
yo admix-react [app-name]
```

Run `gulp build` for building and `gulp` for preview and develop


## Generators

Available generators:

* [admix-react](#app) (aka [admix-react:app](#app))
* [admix-react:page](#page)
* [admix-react:component](#component)
* [admix-react:action](#action)
* [admix-react:store](#store)

**Note: Generators are to be run from the root directory of your app.**

