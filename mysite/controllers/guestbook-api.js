const models = require("../models");
const Sequelize = require("sequelize");

module.exports = {
  read: async function (req, res, next) {
    try {
      const startNo = req.query.no || 0;
      console.log(startNo);
      //db select.. limit
      res.status(200).send({
        result: "success",
        data: [
          { no: 9, name: "둘리", message: "호이", regDate: new Date() },
          { no: 8, name: "또치", message: "둘리 안녕", regDate: new Date() },
          {
            no: 7,
            name: "마이콜",
            message: "게스트북 테스트 중입니다.",
            regDate: new Date(),
          },
        ],
        message: null,
      });
    } catch (err) {
      next(err);
    }
  },
  delete: async function (req, res, next) {
    try {
      console.log(req.params.no + ":" + req.body.password);

      //db delete
      res.status(200).send({
        result: "success",
        data: req.params.no,
        message: null,
      });
    } catch (err) {
      next(err);
    }
  },
  create: async function (req, res, next) {
    try {
      console.log(req.body);
      //db insert
      // await models.Guestbook.create();

      res.status(200).send({
        result: "success",
        data: Object.assign(req.body, {
          /**db에 들어간 내용 */
          no: 10,
          password: "",
          regDate: new Date(),
        }),
      });
    } catch (err) {
      next(err);
    }
  },
};
