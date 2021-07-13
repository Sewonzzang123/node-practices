## guestbook01

model based mysql - 기본 sql 기반

[..\guestbook01] $ npm init -y

[..\guestbook01] $ npm i express
[..\guestbook01] $ npm i ejs
[..\guestbook01] $ npm i mysql
[..\guestbook01] $ npm i -D nodemon

package.json 스크립트 수정

"scripts": {
"start": "index.js",
"debug": "nodemon index.js"
},

[..\guestbook01] $ npm start (운용시 ...)
[..\guestbook01] $ npm run debug(개발시 ... Live Update)

[..\guestbook01] $ mkdir public
[..\guestbook01] $ mkdir views
[..\guestbook01] $ mkdir routes
[..\guestbook01] $ mkdir controllers
[..\guestbook01] $ mkdir models
