import express from "express";
import http from "http";
import connectDb from "./config/db.js";
import test from "./routes/test.js";
import login from "./routes/login.js";
import question from "./routes/question.js";
import updateProfile from "./routes/updateProfile.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Connection and Setting up environment
const port = normalizePort(process.env.PORT || "3000");
const server = http.createServer(app);
app.set("port", port);
server.listen(port);
server.on("listening", onListening);

connectDb();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/login", login);
app.use("/updateProfile", updateProfile);
app.use("/test/question", question);
app.use("/test", test);

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("App started. Listening on " + bind);
}