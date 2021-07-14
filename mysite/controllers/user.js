const models = require("../models");

module.exports = {
  joinform: function (req, res) {
    res.render("user/joinform");
  },
  join: async function (req, res) {
    // Create a new user
    // https://sequelize.org/master/manual/model-querying-basics.html 참조
    const result = await models.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
    });
    console.log(result);
    res.redirect("/user/joinsuccess");
  },
  joinsuccess: function (req, res) {
    res.render("user/joinsuccess");
  },
  loginform: function (req, res) {
    res.render("user/loginform");
  },
  login: async function (req, res) {
    const user = await models.User.findOne({
      attributes: ["no", "name", "role"],
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });
    // console.log(user); /**user.name, ...으로 접근 가능 */
    if (user == null) {
      res.render("user/loginform", { result: "fail" });
    }
    res.redirect("/");
  },
};
