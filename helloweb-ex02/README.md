## 웹 애플리케이션 만들어보기2

based on express: npm package(module)

[..\helloweb-ex02] $ npm init -y

[..\helloweb-ex02] $ npm i express
[..\helloweb-ex02] $ npm i ejs
[..\helloweb-ex02] $ npm i -D nodemon

package.json 스크립트 수정

"scripts": {
"start": "index.js",
"debug": "nodemon index.js"
},

[..\helloweb-ex02] $ npm start (운용시 ...)
[..\helloweb-ex02] $ npm run debug(개발시 ... Live Update)

[..\helloweb-ex02] $ mkdir public
[..\helloweb-ex02] $ mkdir views
[..\helloweb-ex02] $ mkdir routes
[..\helloweb-ex02] $ mkdir controllers
[..\helloweb-ex02] $ mkdir models
