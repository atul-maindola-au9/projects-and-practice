require("dotenv").config();
var express = require("express");
var app = express();
const path = require("path");
require("./db/connection");
const router = require("./routers/couponRouter");
const jwt = require("jsonwebtoken");
const userRouter = require("./routers/userrouter");
const { response } = require("express");

var port = process.env.PORT || 8000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");

// const createtoken;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(userRouter);
app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views", template_path);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/dashboard", (req, res) => {
    res.render("dashboard");
});

app.listen(port, () => {
    console.log(`connection is live at port no. ${port}`);
});
