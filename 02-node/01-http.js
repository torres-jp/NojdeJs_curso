const http = require("node:http");
const fs = require("node:fs");

const desirePort = process.env.PORT ?? 3000;

const processRequest = (req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end("Welcome to my server!");
  } else if (req.url === "/foto-random.png") {
    fs.readFile("./randompic.png", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("<h1>Error 500: Internal Server Error</h1>");
      } else {
        res.setHeader("Content-Type", "image/png")
        res.end(data)
      }
    });
  } else if (req.url === "/contact") {
    res.end("This is the contact page");
  } else {
    res.statusCode = 404;
    res.end("<h1>404 Not Found</h1>");
  }
};

const server = http.createServer(processRequest);

server.listen(desirePort, () => {
  console.log(`server listening on port http://localhost:${desirePort}`);
});
