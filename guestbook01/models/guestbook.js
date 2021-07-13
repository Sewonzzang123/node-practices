const mysql = require("mysql");
const util = require("util");

const dbconn = require("./dbconn");

module.exports = {
  findAll: async function () {
    const conn = dbconn();

    const query = util.promisify(conn.query).bind(conn);
    try {
      return await query(
        "select no, name, message, date_format(reg_date, '%Y/%m/%d %H:%i:%s') as regDate from guestbook order by reg_date desc",
        []
      );
    } catch (err) {
      console.error(err);
    } finally {
      conn.end();
    }
  },
  insert: async function (guestbook) {
    const conn = dbconn();

    const query = util.promisify(conn.query).bind(conn);
    try {
      return await query(
        "insert into guestbook values(null,?,?,?, sysdate())",
        [guestbook.name, guestbook.password, guestbook.message]
      );
    } catch (err) {
      console.error(err);
    } finally {
      conn.end();
    }
  },
  delete: async function (guestbook) {
    const conn = dbconn();

    const query = util.promisify(conn.query).bind(conn);
    try {
      const results = await query(
        "delete from guestbook where no=? and password =?",
        [guestbook.no, guestbook.password]
      );
      results.no = guestbook.no;
      return results;
    } catch (err) {
      console.error(err);
    } finally {
      conn.end();
    }
  },
};
