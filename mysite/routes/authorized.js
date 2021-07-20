module.exports = function (role) {
  return function (req, res, next) {
    // console.log("authorized() called " + role);
    if (
      req.session.authUser &&
      (role !== "ADMIN" || req.session.authUser.role === "ADMIN")
    ) {
      next();
      return;
    }

    if (req.accepts("html")) {
      res.redirect(req.session.authUser ? "/" : "/user/login");
      return;
    }
    //json
    res.send({ result: "fail", data: null, message: "auth fail" });
  };
};
