## emaillist01

model based mysql - 기본 sql 기반

```bash
[..\emaillist01] $ npm init -y

[..\emaillist01] $ npm i express
[..\emaillist01] $ npm i ejs
[..\emaillist01] $ npm i mysql
[..\emaillist01] $ npm i -D nodemon

```

package.json 스크립트 수정

```JSON
"scripts": {
"start": "index.js",
"debug": "nodemon index.js"
},
```

```bash
[..\emaillist01] $ npm start (운용시 ...)
[..\emaillist01] $ npm run debug(개발시 ... Live Update)

[..\emaillist01] $ mkdir public
[..\emaillist01] $ mkdir views
[..\emaillist01] $ mkdir routes
[..\emaillist01] $ mkdir controllers
[..\emaillist01] $ mkdir models
```

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
