const models = require("../models");
const path = require("path");
const fs = require("fs");

module.exports = {
  index: async function (req, res, next) {
    try {
      res.render("gallery/index");
    } catch (err) {
      next(err);
    }
  },
  delete: async function (req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  },
  upload: async function (req, res, next) {
    try {
      const file = req.file;
      const storeDirectory = path.join(
        path.dirname(require.main.filename) /**mysite */,
        process.env.STATIC_RESOURCES_DIRECTORY,
        process.env.GALLERY_STORE_LOCATION
      );
      const url =
        path.join(process.env.GALLERY_STORE_LOCATION, file.filename) +
        path.extname(file.originalname); /**확장자 명 */
      const storePath =
        path.join(storeDirectory, file.filename) +
        path.extname(file.originalname);
      fs.existsSync(storeDirectory) || fs.mkdirSync(storeDirectory);
      const content = fs.readFileSync(file.path);
      fs.writeFileSync(storePath, content, { flag: "w+" });

      await models.Gallery.create({
        url: url.replace(/\\/gi, "/"),
        comment: req.body.comment || "",
      });
      res.redirect("/gallery");
    } catch (err) {
      next(err);
    }
  },
};
