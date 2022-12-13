const express = require("express");
const {
	createLeave,
	getAllLeaves,
	updateLeaveStatus,
	deleteLeave,
	getSingleLeave,
} = require("../controllers/leaveController");
const {
	isAuthenticated,
	AuthorizeRoles,
} = require("../middleware/Authentication");
const Leaverouter = express.Router();

Leaverouter.post("/createleave", isAuthenticated, createLeave)
	.get(
		"/admin/getallleaves",
		isAuthenticated,
		AuthorizeRoles("admin"),
		getAllLeaves
	)
	.patch(
		"/admin/updateleave/:id",
		isAuthenticated,
		AuthorizeRoles("admin"),
		updateLeaveStatus
	)
	.delete(
		"/admin/deleteleave/:id",
		isAuthenticated,
		AuthorizeRoles("admin"),
		deleteLeave
	)
	.get(
		"/admin/leavedetails/:id",
		isAuthenticated,
		AuthorizeRoles("admin"),
		getSingleLeave
	);

module.exports = Leaverouter;
