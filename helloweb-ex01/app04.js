const connect = require("connect");
const serveStatic = require("serve-static");
const connectRoute = require("connect-route");

const port = 8080;
const app = connect();

app.use(serveStatic(__dirname + "/public"));
app.use(
  connectRoute(function (router) {
    router.get("/", function (req, resp) {
      resp.writeHead(200, { "Content-Type": "text/html" });
      resp.end("<h1>main</h1>");
    });
    //guestbook
    router.get("/guestbook", function (req, resp) {
      resp.writeHead(200, { "Content-Type": "text/html" });
      resp.end("<h1>guestbook : list</h1>");
    });
    //board
    router.get("/board", function (req, resp) {
      resp.writeHead(200, { "Content-Type": "text/html" });
      resp.end("<h1>board : list</h1>");
    });
    //board/10
    router.get("/board/:no", function (req, resp) {
      resp.writeHead(200, { "Content-Type": "text/html" });
      resp.end("<h1>board : view(" + req.params.no + ")</h1>");
    });
    //user?no=10
    router.get("/user", function (req, resp) {
      console.log(req._parsedUrl.query);
      req.query = {};

      params = (req._parsedUrl.query || "").split("&");
      params.forEach((param) => {
        tokens = param.split("=");
        params[tokens[0]] = tokens[1];
      });

      // console.log(params); { no: '10', name: 'sewon' }
      resp.writeHead(200, { "Content-Type": "text/html" });
      resp.end("<h1>user no:" + req.query.no + "</h1>");
    });
  })
);
app.listen(port, () => {
  console.log(`Http Server running on port ${port}`);
});
