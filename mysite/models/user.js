const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  //user라는 객체의 정보를 정의.
  return sequelize.define(
    "User",
    {
      no /* node 안에서 정의하는 이름 */: {
        field: "no" /* 테이블에서의 칼럼명 */,
        type: DataTypes.INTEGER(11),
        primaryKey: true /* 없으면 안쓰면 됨 */,
        autoIncrement: true,
      },
      name: {
        field: "name",
        type: DataTypes.STRING(45),
        allowNull: false /*not null */,
      },
      email: {
        field: "email",
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      password: {
        field: "password",
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      gender: {
        field: "gender",
        type: DataTypes.ENUM(["female", "male"]),
        allowNull: false,
      },
      role: {
        field: "role",
        type: DataTypes.ENUM(["USER", "ADMIN"]),
        allowNull: true,
        defaultValue: "USER",
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      timestamp: true,
      createdAt: false,
      updatedAt: false,
      tableName: "user",
    }
  );
};
