const User = require("../models");

module.exports = {
  joinform: function (req, res) {
    res.render("user/joinform");
  },
  join: async function (req, res) {
    console.log(req.body);
    // Create a new user
    // https://sequelize.org/master/manual/model-querying-basics.html 참조
    // const result = await User.create({ });

    res.redirect("user/joinsuccess");
  },
  joinsuccess: function (req, res) {
    res.render("user/joinsuccess");
  },
};
