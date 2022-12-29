const app = require("./backend/app");
const PORT = process.env.PORT;
const http = require("http");
const server = http.createServer(app);
server.listen(PORT, (err) => {
  if (err) throw err.message;
  console.log("server running port : " + PORT);
});
