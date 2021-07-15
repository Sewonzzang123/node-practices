module.exports = function (req, res, next) {
  if (req.session.authUser) {
    next();
    return;
  }
  if (req.accepts("html")) {
    res.redirect("/user/login");
    return;
  }
  //json
  res.send({ result: "fail", data: null, message: "auth fail" });
};
