const { Sequelize, DataTypes } = require("sequelize");

// dbname, user, password, {host, port, dialect}
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);

const User = require("./User")(sequelize);
//const Guestbook = require("./guestbook")(sequelize);

//객체의 sync작업을 해야해
User.sync({
  force: process.env.TABLE_CREATE_ALWAYS === "true", // true : 무조건 테이블을 생성한다. false : 현재 테이블과 연결시켜
  alter: process.env.TABLE_ALTER_SYNC === "true", // 객체의 정보(내용)가 변경되면 alter 쿼리가 실행된다.
});
//Guestbook.sync({force:false,alter:true});
module.exports = { User /*:User */ /**, Guestbook */ };
