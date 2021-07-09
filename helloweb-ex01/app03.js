const connect = require("connect");
const serveStatic = require("serve-static"); //app02.js에서 이미지 깨지는것 등...을 해결

const port = 8080;
const app = connect();

app.use(serveStatic(__dirname + "/public"));
app.listen(port, () => {
  console.log(`Http Server running on port ${port}`);
});
