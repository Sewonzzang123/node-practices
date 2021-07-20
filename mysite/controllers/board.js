const models = require("../models");
const Sequelize = require("sequelize");

module.exports = {
  index: async function (req, res, next) {
    try {
      const page = req.params.p || 1;
      const currentPage = Number(page);
      const keyword = req.query.kwd || "";

      const LIST_SIZE = 5;
      const PAGE_SIZE = 5;

      const results = await models.Board.findAll({
        attributes: [
          "no",
          "title",
          "hit",
          [
            Sequelize.fn(
              "date_format",
              Sequelize.col("reg_date"),
              "%Y/%m/%d %H:%i:%s"
            ),
            "regDate",
          ],
          "depths",
          "User.name",
          "parentNo",
        ],
        where: keyword
          ? {
              title: {
                [Sequelize.Op.like]: ["%" + keyword + "%"],
              },
            }
          : {},
        order: [
          ["groupNo", "desc"],
          ["orderNo", "asc"],
        ],
        include: { model: models.User, required: false },
        offset: (currentPage - 1) * 5,
        limit: LIST_SIZE,
      });

      const result = await models.Board.count({
        where: keyword
          ? {
              title: {
                [Sequelize.Op.like]: ["%" + keyword + "%"],
              },
            }
          : {},
      });

      let totalCount = result;
      let pageCount = Math.ceil(totalCount / LIST_SIZE);
      let blockCount = Math.ceil(pageCount / PAGE_SIZE);
      let currentBlock = Math.ceil(currentPage / PAGE_SIZE);

      if (currentPage > pageCount) {
        currentPage = pageCount;
        currentBlock = Math.ceil(currentPage / PAGE_SIZE);
      }
      if (currentPage < 1) {
        currentPage = 1;
        currentBlock = 1;
      }

      let beginPage =
        currentBlock == 0 ? 1 : (currentBlock - 1) * PAGE_SIZE + 1;
      let prevPage = currentBlock > 1 ? (currentBlock - 1) * PAGE_SIZE : 0;
      let nextPage =
        currentBlock < blockCount ? currentBlock * PAGE_SIZE + 1 : 0;
      let endPage = nextPage > 0 ? beginPage - 1 + LIST_SIZE : pageCount;

      const pageInfo = {
        totalCount: totalCount,
        listSize: LIST_SIZE,
        currentPage: currentPage,
        beginPage: beginPage,
        endPage: endPage,
        prevPage: prevPage,
        nextPage: nextPage,
        keyword: keyword,
      };
      res.render("board/list", { list: results, map: pageInfo });
    } catch (err) {
      next(err);
    }
  },
  view: async function (req, res, next) {
    try {
      let no = req.params.no;
      const result = await models.Board.findOne({
        attributes: ["no", "title", "contents", "hit", "userNo"],
        where: {
          no: no,
        },
      });
      const hit = await models.Board.update(
        { hit: Number(result.hit) + 1 },
        {
          where: { no: no },
        }
      );
      res.render("board/view", { board: result });
    } catch (err) {
      next(err);
    }
  },
  write: function (req, res) {
    res.render("board/write");
  },
  _write: async function (req, res, next) {
    try {
      let user = req.session.authUser;
      const groupNo = await models.Board.max("group_no");
      let maxGroupNo = Number(groupNo) + 1;
      const result = await models.Board.create({
        title: req.body.title,
        contents: req.body.contents,
        hit: 0,
        groupNo: maxGroupNo,
        userNo: user.no,
      });
      res.redirect("/board/view/" + result.no);
    } catch (err) {
      next(err);
    }
  },
  delete: async function (req, res, next) {
    try {
      const result = await models.Board.destroy({
        where: {
          no: req.params.no,
          userNo: req.session.authUser ? req.session.authUser.no : "",
        },
      });
      const update = await models.Board.update(
        {
          parentNo: -1,
        },
        { where: { parentNo: req.params.no } }
      );
      res.redirect("/board");
    } catch (err) {
      next(err);
    }
  },
  update: async function (req, res, next) {
    try {
      const result = await models.Board.findOne({
        attribute: ["userNo", "no", "title", "contents"],
        where: {
          no: req.params.no,
          userNo: req.session.authUser ? req.session.authUser.no : "",
        },
      });
      res.render("board/update", { board: result });
    } catch (err) {
      next(err);
    }
  },
  _update: async function (req, res, next) {
    try {
      const result = await models.Board.update(req.body, {
        where: {
          no: req.body.no,
          userNo: req.session.authUser ? req.session.authUser.no : "",
        },
      });
      console.log(result);
      res.redirect("/board/view/" + req.body.no);
    } catch (err) {
      next(err);
    }
  },
  reply: async function (req, res, next) {
    try {
      const result = await models.Board.findOne({
        attribute: ["userNo", "no", "title", "contents"],
        where: {
          no: req.params.no,
          userNo: req.session.authUser ? req.session.authUser.no : "",
        },
      });
      res.render("board/reply", { board: result });
    } catch (err) {
      next(err);
    }
  },
  _reply: async function (req, res, next) {
    try {
      const updateGroup = await models.Board.update(
        {
          orderNo: Sequelize.literal("order_no + 1"),
        },
        {
          where: {
            groupNo: req.body.groupNo,
            orderNo: {
              [Sequelize.Op.gte]: Number(req.body.orderNo) + 1,
            },
          },
        }
      );
      const result = await models.Board.create({
        title: req.body.title,
        contents: req.body.contents,
        hit: 0,
        groupNo: req.body.groupNo,
        userNo: req.session.authUser.no,
        depths: req.body.depths + 1,
        orderNo: req.body.orderNo + 1,
        parentNo: req.body.no,
      });
      res.redirect("/board/view/" + result.no);
    } catch (err) {
      next(err);
    }
  },
};
