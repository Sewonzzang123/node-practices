const model = require("../models/guestbook");

module.exports = {
  index: async function (req, res) {
    const results = await model.findAll();
    // console.log(results);
    res.render("index", { list: results || [] });
  },
  form: function (req, res) {
    res.render("deleteform", { no: req.query.no, notcorrect: 1 });
  },
  delete: async function (req, res) {
    const results = await model.delete(req.body);
    if (results.affectedRows == 1) {
      res.redirect("/");
    } else {
      res.render("deleteform", {
        no: req.body.no,
        notcorrect: results.affectedRows,
      });
    }
  },
  add: async function (req, res) {
    const results = await model.insert(req.body);
    res.redirect("/");
  },
};
