// model User test
const dotenv = require("dotenv");
const path = require("path");
const assert = require("assert").strict;

dotenv.config({
  path: path.join(
    path.resolve(__dirname, ".."), // 특정 디렉토리 부모 구하기
    "config/db.env"
  ),
});

describe("Model user", function () {
  let models = null;

  before(async function () {
    models = require("../models");
  });

  it("fetch User(no=1)", async function () {
    const user = await models.User.findOne({ where: { no: 1 } });
    assert.equal(user.no, 1);
  });

  after(async function () {
    console.log(/** db종료 */);
  });
});
