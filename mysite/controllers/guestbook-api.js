const models = require("../models");
const Sequelize = require("sequelize");

module.exports = {
  read: async function (req, res, next) {
    try {
      const startNo = req.query.no || 0;
      console.log(startNo);
      //db select.. limit

      const result = await models.Guestbook.findAll({
        attributes: [
          "no",
          "name",
          "message",
          [
            Sequelize.fn(
              "date_format",
              Sequelize.col("reg_date"),
              "%Y/%m/%d %H:%i:%s"
            ),
            "regDate",
          ],
        ],
        where: startNo > 0 ? { no: { [Sequelize.Op.lt]: startNo } } : {},
        order: Sequelize.literal("reg_date DESC"),
        offset: 0,
        limit: 5,
      });
      res.status(200).send({
        result: "success",
        data: result,
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
      const results = await models.Guestbook.destroy({
        where: {
          no: req.params.no,
          password: req.body.password,
        },
      });
      if (results == 1) {
        res.status(200).send({
          result: "success",
          data: req.params.no,
          message: null,
        });
      } else {
        res.status(200).send({
          result: "success",
          data: -1,
          message: null,
        });
      }
    } catch (err) {
      next(err);
    }
  },
  create: async function (req, res, next) {
    try {
      console.log(req.body);
      //db insert
      // await models.Guestbook.create();
      const result = await models.Guestbook.create({
        name: req.body.name,
        password: req.body.password,
        message: req.body.message,
      });
      console.log(result);
      res.status(200).send({
        result: "success",
        data: Object.assign(req.body, {
          no: result.no,
          password: "",
          regDate: new Date(), //format해야됨
        }),
      });
    } catch (err) {
      next(err);
    }
  },
};
