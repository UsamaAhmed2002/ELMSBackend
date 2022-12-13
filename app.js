const express = require("express");
const employeeRoutes = require("./routers/employessRoutes");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const Leaverouter = require("./routers/leaveRoutes");
const cors = require("cors");
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use("/api/v1", Leaverouter);
app.use("/api/v1", employeeRoutes);

module.exports = app;
