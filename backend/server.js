const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.js"); // or db.json
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router);

const port = process.env.PORT || 10000;
server.listen(port, () => {
  console.log("JSON Server is running on port " + port);
});
