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

promisify : https://github.com/ljharb/util.promisify/blob/main/implementation.js 참고

mysql dbconnection, sql query

```javascript
const util = require("util");

const conn = dbconn();
const query = util.promisify(conn.query).bind(conn);
try {
  return await query("insert into emaillist values(null, ?, ?, ?)", [
    emaillist.fn,
    emaillist.ln,
    emaillist.email,
    //Object.values(emaillist), 차례가 ?순에 맞게 등록되어있을 경우 사용 가능
  ]);
} catch (err) {
  console.error(err);
} finally {
  conn.end();
}
```
