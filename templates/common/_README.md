## admix-react 项目 ( react.js + reflux.js + bootstrap/ratchet )

### 构建项目前提条件
```bash
sudo npm install -g yo
sudo npm install -g gulp
sudo npm install -g bower
sudo npm install -g generator-admix-react
```

### 初始化项目后要做的事情
* bower install
* npm install (为了避免报错，请先修改.npm目录的权限：sudo chmod -R 777 /Users/用户名/.npm/)

### 开发流程

```bash
gulp
```

* 新增page：
```bash
yo admix-react:page mainpage
```

* 新增component：
```bash
yo admix-react:component pagename:user
```

* 新增action：
```bash
yo admix-react:action user
```

* 新增store：
```bash
yo admix-react:store user
```

### 构建
```bash
gulp build
```
