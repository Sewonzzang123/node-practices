const models = require("../models");
const Sequelize = require("sequelize");
module.exports = {
  index: async function (req, res) {
    const results = await models.Guestbook.findAll({
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
      order: Sequelize.literal("reg_date DESC"),
    });
    res.render("guestbook/index", { list: results || [] });
  },
  delete: function (req, res) {
    res.render("guestbook/deleteform", { no: req.query.no });
  },
  _delete: async function (req, res) {
    try {
      const results = await models.Guestbook.destroy({
        where: {
          no: req.body.no,
          password: req.body.password,
        },
      });

      if (results == 1) {
        res.redirect("/guestbook");
      } else {
        res.render("guestbook/deleteform", {
          no: req.body.no,
          result: String(results),
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      console.log("!!");
    }
  },
  add: async function (req, res) {
    await models.Guestbook.create({
      name: req.body.name,
      password: req.body.password,
      message: req.body.message,
    });
    res.redirect("/guestbook");
  },
};
