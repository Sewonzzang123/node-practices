## emaillist01

model based mysql - 기본 sql 기반

[..\emaillist01] $ npm init -y

[..\emaillist01] $ npm i express
[..\emaillist01] $ npm i ejs
[..\emaillist01] $ npm i mysql
[..\emaillist01] $ npm i -D nodemon

package.json 스크립트 수정

"scripts": {
"start": "index.js",
"debug": "nodemon index.js"
},

[..\emaillist01] $ npm start (운용시 ...)
[..\emaillist01] $ npm run debug(개발시 ... Live Update)

[..\emaillist01] $ mkdir public
[..\emaillist01] $ mkdir views
[..\emaillist01] $ mkdir routes
[..\emaillist01] $ mkdir controllers
[..\emaillist01] $ mkdir models
