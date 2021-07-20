const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  //user라는 객체의 정보를 정의.
  return sequelize.define(
    "Board",
    {
      no: {
        field: "no",
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        field: "title",
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      contents: {
        field: "contents",
        type: DataTypes.TEXT,
        allowNull: false,
      },
      regDate: {
        field: "reg_date",
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("now"),
        allowNull: false,
      },
      hit: {
        field: "hit",
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      groupNo: {
        field: "group_no",
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: 0,
      },
      orderNo: {
        field: "order_no",
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: 0,
      },
      depths: {
        field: "depths",
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: 0,
      },
      parentNo: {
        field: "parent_no",
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      timestamp: true,
      createdAt: false,
      updatedAt: false,
      tableName: "board",
    }
  );
};
