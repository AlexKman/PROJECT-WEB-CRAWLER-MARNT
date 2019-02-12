const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const { url, method } = req;
  console.log(url);
  if (method === "GET") {
    res.write("GET REQUESTED");
    res.end();
  }
  if (method === "POST") {
    let body = [];
    req
      .on("data", chunk => {
        body.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(body).toString();
        console.log(JSON.parse(body));
        res.write("POST REQUESTED");
        // findBrokenLinks(body.url)
        res.end();
      });
  }
});

server.listen(9090, () => {
  console.log("listening on port 9090...");
});
