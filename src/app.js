const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
//const { authentication } = require("./middlewares/oauth/authentication");

const app = express();
//require("./config/config.database");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "/public"));
//app.use(authentication);

app.engine("html", require("ejs").renderFile);

app.set("view engine", "html");


app.use("/api/user", require("./routes/users.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/owner", require("./routes/owner.routes"));
app.use("/api/vehicle", require("./routes/vehicles.routes"));
app.use("/api/quiz", require("./routes/quiz.routes"));
app.use("/api/section", require("./routes/sections.routes"));
app.use("/api/question", require("./routes/question.routes"));

module.exports = app;
