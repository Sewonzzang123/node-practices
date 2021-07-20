// model User test
const dotenv = require("dotenv");
const path = require("path");
const should = require("chai").should();

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

  after(async function () {
    // test에 사용되고 사라짐
    await models.Board.destroy({
      where: {
        userNo: user.no,
      },
    });
    await models.User.destroy({
      where: {
        no: user.no,
      },
    });
  });
});
