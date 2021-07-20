const models = require("../models");

module.exports = {
  index: async function (req, res, next) {
    try {
      const result = await models.Site.findOne({
        attribute: ["title", "welcome", "profile", "description"],
      });
      res.render("main/index", { site: result });
    } catch (err) {
      console.error(err);
    }
  },
};
