const models = require("../models");

module.exports = {
  join: function (req, res) {
    res.render("user/joinform");
  },
  _join: async function (req, res) {
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
  login: function (req, res) {
    res.render("user/loginform");
  },
  _login: async function (req, res) {
    const user = await models.User.findOne({
      attributes: ["no", "name", "role"],
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });
    // console.log(user); /**user.name, ...으로 접근 가능 */
    if (user == null) {
      res.render(
        "user/loginform",
        Object.assign(req.body, { result: "fail", password: "" })
      );
      return;
    }
    //로그인 처리
    user.password = "";
    req.session.authUser = user;
    res.redirect("/");
  },
  logout: async function (req, res) {
    await req.session.destroy();
    res.redirect("/");
  },
  update: async function (req, res) {
    const no = req.session.authUser.no;
    const user = await models.User.findOne({
      attributes: ["no", "email", "name", "gender"],
      where: {
        no: no,
      },
    });
    res.render("user/update", {
      email: user.email,
      name: user.name,
      gender: user.gender,
    });
  },
  _update: async function (req, res) {
    console.log(req.body);
    if (req.body.password == "") {
      await models.User.update(
        {
          name: req.body.name,
          gender: req.body.gender,
        },
        {
          where: {
            email: req.body.email,
          },
        }
      );
    } else {
      await models.User.update(
        {
          name: req.body.name,
          password: req.body.password,
          gender: req.body.gender,
        },
        {
          where: {
            email: req.body.email,
          },
        }
      );
    }
    req.session.authUser.name = req.body.name;
    res.redirect("/user/update");
  },
};
