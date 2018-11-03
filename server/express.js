import express from "express";
import path from "path";
import Mail from './helpers/Mail'
const webpack = require("webpack");
const bodyParser = require("body-parser");
const config = require("../webpack.js");
const server = express();
const compiler = webpack(config);


if (process.env.NODE_ENV !== "production") {
  const webpackDevMiddleware = require("webpack-dev-middleware")(
    compiler,
    config.devServer
  );
  
  const webpackHotMiddlware = require("webpack-hot-middleware")(
    compiler,
    config.devServer
  );
  
  server.use(webpackDevMiddleware);
  server.use(webpackHotMiddlware);
} 

const staticMiddleware = express.static("build");
server.use(staticMiddleware);

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "http://localhost"
server.listen(PORT, () => {
  console.log(`Server listening on ${HOST}:${PORT}`);
});

server.use(bodyParser.urlencoded({ extended: false }));

// parse serverlication/json
server.use(bodyParser.json());

server.get("/cv", function(req, res) {
  console.log(path.join(__dirname, "../build/images/cv-2018-pn-921113.pdf"))
  var filePath = path.join(__dirname, "../build/images/cv-2018-pn-921113.pdf");

  res.download(filePath);
});

server.post("/contact", function(req, res) {
  const {name, email, subject, message} = req.body;
  const mail = new Mail("Patrik");
  const output = `
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${name}</li>
      <li>Email: ${email}</li>
    </ul>
    <h3>Message</h3>
    <p>${message}</p>
  `;

  mail.send(subject, output, ["patriknilsson1992@gmail.com"])
  .then(data => res.send('ok'))
  .catch(err => res.status(500).send(err))
});
