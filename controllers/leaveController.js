const LeaveModel = require("../models/LeaveModel");

exports.createLeave = async (req, res, next) => {
	try {
		const { reason, noOfDays } = req.body;
		const leave = await (
			await LeaveModel.create({
				reason,
				noOfDays,
				employee: req.employee._id,
			})
		).populate({
			path: "employee",
		});
		res.status(200).json({
			success: true,
			message: "leave Has Been Submitted Successfully",
			leave,
		});
	} catch (e) {
		res.status(400).json({
			success: false,
			error: e.message,
		});
	}
};

//get All Leaves For Admin
exports.getAllLeaves = async (req, res, next) => {
	try {
		const leaves = await LeaveModel.find().populate("employee");
		if (leaves)
			return res.status(200).json({
				success: true,
				leaves,
			});
	} catch (e) {
		res.status(401).json({
			success: false,
			error: e.message,
		});
	}
};

exports.updateLeaveStatus = async (req, res, next) => {
	try {
		const leave = await LeaveModel.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (leave)
			return res.status(200).json({
				success: true,
				message: "Leave Status Updated Successfully",
				leave,
			});
	} catch (e) {
		return res.status(401).json({
			success: false,
			error: e.message,
		});
	}
};
exports.deleteLeave = async (req, res) => {
	try {
		const leave = await LeaveModel.findByIdAndDelete(req.params.id);
		if (leave)
			return res.status(200).json({
				success: true,
				message: "Leave Deleted Successfully",
			});
	} catch (e) {
		res.status(401).json({
			success: false,
			error: e.message,
		});
	}
};

//controller for getting single leave detail
exports.getSingleLeave = async (req, res) => {
	try {
		//getting Leave From The Leave Model By Passing Id Fetched From The Req Url Param
		const leave = await LeaveModel.findById(req.params.id).populate("employee");
		if (leave)
			return res.status(200).json({
				success: true,
				leave,
			});
	} catch (e) {
		res.status(401).json({
			success: false,
			error: e.message,
		});
	}
};
