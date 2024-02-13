import express from "express";
import http from "http";
import connectDb from "./config/db.js";
import test from "./routes/test.js";
import login from "./routes/login.js";
import question from "./routes/question.js";
import updateProfile from "./routes/updateProfile.js";
import response from "./routes/response.js";
import cors from "cors";
import pkg from "http-proxy";
const { createProxy } = pkg;
const proxy = createProxy();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.set("view engine", "ejs");

app.use(express.static("public")); // Create a 'public' folder for static files like stylesheets

app.use((req, res, next) => {
  const hostName = req.hostname;
  const subdomain = hostName.split(".")[0];
  console.log(subdomain);
  if (subdomain == "google") {
    return proxy.web(req, res, {
      target: "https://upload-files.adaptable.app",
      changeOrigin: true,
    });
  } else if (subdomain == "app") {
    return proxy.web(req, res, {
      target: "https://leetcode.com/arpit_nema",
      changeOrigin: true,
    });
  }
  next();
});
// Connection and Setting up environment
const port = normalizePort(process.env.PORT || "3001");
const server = http.createServer(app);
app.set("port", port);
server.listen(port);
server.on("listening", onListening);

connectDb();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.use("/login", login);
app.use("/updateProfile", updateProfile);
app.use("/test/question", question);
app.use("/test", test);
app.use("/response", response);

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
