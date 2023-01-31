const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const connection = require("./config/db");
const authRoute = require('./routes/auth')
require("dotenv").config();
require("./passport")


const app = express();
// const PORT = process.env.PORT || 8080;

app.use(
  cookieSession({
    name: "mysession",
    keys: ["suraj"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.use(
  cors({
    origin: "http://localhost:3000",
    method: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.listen("8080", async () => {
  try {
    await connection;
    console.log("connected to  db");
  } catch (err) {
    console.log(err);
  }
  console.log(`server is running on 8080`);
});
