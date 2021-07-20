// model User test
const dotenv = require("dotenv");
const path = require("path");
const should = require("chai").should();
const Sequelize = require("sequelize");

dotenv.config({
  path: path.join(
    path.resolve(__dirname, ".."), // 특정 디렉토리 부모 구하기
    "config/db.env"
  ),
});

describe("Model board", function () {
  let models = null;
  let user = null;
  before(async function () {
    models = require("../models");
    //test를 위한 user만들기
    user = await models.User.create({
      name: "testUser",
      password: "1234",
      email: "test@mysite.com",
      gender: "female",
    });
  });

  it("create 3 Boards", async function () {
    let board = await models.Board.create({
      title: "test",
      contents: "test",
      hit: 0,
      userNo: user.no,
    });
    board.no.should.not.equal(undefined);

    board = await models.Board.create({
      title: "test",
      contents: "test",
      hit: 0,
      userNo: user.no,
    });
    board.no.should.not.equal(undefined);

    board = await models.Board.create({
      title: "test",
      contents: "test",
      hit: 0,
      userNo: user.no,
    });
    board.no.should.not.equal(undefined);
  });

  it("fetch boards by user(test)", async function () {
    const results = await models.Board.findAll({
      where: { userNo: user.no },
      include: { model: models.User, required: true },
    });
    results.should.have.lengthOf(3);
  });

  it("fetch boards by page", async function () {
    let keyword;
    let page = 2;
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
      offset: (page - 1) * 5,
      limit: 5,
    });
    for (let i = 0; i < results.length; i++) {
      let vo = results[i];
      console.log(vo.User.name);
    }
    results.should.have.lengthOf(5);
  });

  it("count board", async function () {
    let keyword = "마루";
    const result = await models.Board.count({
      where: keyword
        ? {
            title: {
              [Sequelize.Op.like]: ["%" + keyword + "%"],
            },
          }
        : {},
    });
    console.log(result);
  });

  it("view board and update hit", async function () {
    let no = 96;
    const result = await models.Board.findOne({
      attributes: ["no", "title", "contents", "hit", "user_no"],
      where: {
        no: no,
      },
      include: { model: models.User, required: false },
    });
    const hit = await models.Board.update(
      { hit: Number(result.hit) + 1 },
      {
        where: { no: no },
      }
    );
  });

  after(async function () {
    // test에 사용되고 사라짐
    await models.User.destroy({
      where: {
        no: user.no,
      },
    });
  });
});
