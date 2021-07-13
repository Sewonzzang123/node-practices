const mysql = require("mysql");
const util = require("util");

const dbconn = require("./dbconn");
/*https://github.com/ljharb/util.promisify/blob/main/implementation.js 참고
const promisify = function (f) {
  return function () {
    return new Promise(function (resolve, reject) {
        f.apply(arguments,function(){ this.});
    });
  };
};

f = promisify(conn.query).bind(conn);
res = await = f()
*/
module.exports = {
  findAll: async function () {
    const conn = dbconn();
    /*
    const query = (sql, data) => {
      return new Promise((resolve, reject) =>
        conn.query(sql, data, (error, rows, field) =>
          error ? reject(error) : resolve(rows)
        )
      );
    };
    */
    const query = util.promisify(conn.query).bind(conn);
    try {
      return await query(
        "select first_name as firstName, last_name as lastName, email from emaillist order by no desc",
        []
      );
    } catch (err) {
      console.error(err);
    } finally {
      conn.end();
    }
  },
  insert: async function (emaillist) {
    console.log(emaillist);
    console.log(Object.values(emaillist));
    const conn = dbconn();
    const query = util.promisify(conn.query).bind(conn);
    try {
      return await query("insert into emaillist values(null, ?, ?, ?)", [
        emaillist.fn,
        emaillist.ln,
        emaillist.email,
        //Object.values(emaillist),
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      conn.end();
    }
  },
};
