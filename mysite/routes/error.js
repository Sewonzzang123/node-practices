const logger = require("../logging");

module.exports = {
  error404: function (req, res) {
    //없는 것들에 대한 처리 404 error
    res.status(404).render("error/404");
  },
  error500: function (err, req, res, next) {
    // 500 error
    logger.error(err.stack);
    // res.status(500).render("error/500");
    res.status(500).send(`<pre>${err.stack}</pre>`);
  },
};
