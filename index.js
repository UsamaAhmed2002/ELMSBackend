const DB = require("./DB/Db");
const express = require("express");
const app = require("./app");
DB();

// app.get("/", (req, res) => {
// 	res.send("HEllo world");
// });

app.listen(3000, () => {
	console.log("App is Running on Port 3000");
});
