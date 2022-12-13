const express = require("express");
const {
	getAllEmployeesforAdmin,
	createEmployee,
	updateEmployee,
	deleteEmployee,
	loginEmployee,
	logoutEmployee,
} = require("../controllers/employessController");
const {
	isAuthenticated,
	AuthorizeRoles,
} = require("../middleware/Authentication");

const router = express.Router();

router
	.get(
		"/admin/employess",
		isAuthenticated,
		AuthorizeRoles("admin"),
		getAllEmployeesforAdmin
	)
	.post("/register", createEmployee)
	.patch("/updateemployee/:id", updateEmployee)
	.delete("/admin/deleteemployee/:id", deleteEmployee)
	.post("/login", loginEmployee)
	.get("/logout", logoutEmployee);

module.exports = router;
