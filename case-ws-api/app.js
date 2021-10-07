/** @format */

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import bcrypt from "bcrypt";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  try {
    await mongoose.connect(process.env.DB_URI);

    console.log("MongoDB has connected");
  } catch (err) {
    console.log(err);
    process.exit();
  }
})();

import index from "./routers/index";

app.use(cors());
app.use(express.json());
app.use("/", express.static("./public"));
app.use("/static", express.static("./public/static"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use("/", index);

app.get("*", (req, res) =>
  res.sendFile("index.html", {
    root: "./public",
    // root: "../case-ws/public",
  })
);

app.listen(process.env.PORT, () => {
  console.log("Server lyssnar på port", process.env.PORT);
});
