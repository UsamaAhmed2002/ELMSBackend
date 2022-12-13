const employeeModels = require("../models/employeeModels");
const Employee = require("../models/employeeModels");
const bcrypt = require("bcrypt");
// api for getting all employees for admin or HR
exports.getAllEmployeesforAdmin = async (req, res, next) => {
	try {
		const employess = await Employee.find();
		res.status(200).send({
			success: true,
			employess,
		});
	} catch (e) {
		res.status(500).send({
			error: e.message,
		});
		next();
	}
};

// api for creating the employee
exports.createEmployee = async (req, res, next) => {
	try {
		//sending req data or employee data to create an employee
		const employee = await Employee.create(req.body);
		const token = employee.getJwtToken();
		const options = {
			expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
			httpOnly: true,
		};
		res.status(200).cookie("token", token, options).send({
			success: true,
			employee,
		});
	} catch (e) {
		res.status(500).send({
			success: false,
			error: e.message,
		});
		next();
	}
};

// api for updating the employeee
exports.updateEmployee = async (req, res, next) => {
	try {
		// const { id } = req.params;
		const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
			useFindAndModify: false,
		});
		res.status(200).json({
			success: true,
			employee,
		});
	} catch (e) {
		res.status(500).json({
			success: false,
			error: e.message,
		});
	}
};

// api for Deleting an Employee
exports.deleteEmployee = async (req, res, next) => {
	try {
		await Employee.findByIdAndDelete(req.params.id);
		res.status(200).json({
			success: true,
			message: "Employee Deleted Successfully",
		});
	} catch (e) {
		res.status(500).json({
			success: false,
			error: e.message,
		});
	}
};

//api for login employee
exports.loginEmployee = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		//if Employe HAvn;t Entered Email or Password
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				error: "Please Enter A Valid Email Password",
			});
		}
		const employee = await employeeModels
			.findOne({ email })
			.select("+password");
		//if The Employee has entered Wrong Credentials
		if (!employee) {
			return res.status(400).json({
				success: false,
				error: "Sorry !Your Credentials did'nt Matched Our Redords",
			});
		}
		const isPasswordMatched = await employee.matchPassword(password);
		if (!isPasswordMatched) {
			return res.status(401).json({
				success: false,
				error: "Your Password is Incorrect",
			});
		}
		//when The Employee is Found Successfully
		const token = employee.getJwtToken();
		const options = {
			expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
			httpOnly: true,
		};
		res.status(200).cookie("token", token, options).send({
			success: true,
			employee,
		});
	} catch (e) {
		res.status(400).json({
			success: false,
			error: e.message,
		});
	}
};

//logout function for Employee
exports.logoutEmployee = (req, res, next) => {
	res
		.status(200)
		.cookie("token", null, {
			expires: new Date(Date.now()),
			httpOnly: true,
		})
		.json({
			success: true,
			message: "Logged Out Successfully",
		});
};
