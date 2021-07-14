const { Sequelize, DataTypes } = require("sequelize");

// dbname, user, password, {host, port, dialect}
const sequelize = new Sequelize("webdb", "webdb", "webdb", {
  host: "192.168.80.112",
  port: 3307,
  dialect: "mysql",
});

const User = require("./user")(sequelize);
//const Guestbook = require("./guestbook")(sequelize);

//객체의 sync작업을 해야해
User.sync({
  force: false, // true : 무조건 테이블을 생성한다. false : 현재 테이블과 연결시켜
  alter: false, // 객체의 정보(내용)가 변경되면 alter 쿼리가 실행된다.
});
//Guestbook.sync({force:false,alter:true});
module.exports = { User /*:User */ /**, Guestbook */ };
