const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//creating new model
const employeeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minLength: [8, "Please Enter a Name That is Minimum 8 Characters Long"],
		maxLength: [20, "Your name cannot Exceed 20 Characters"],
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
		minLength: [8, "Please Enter A Password That is Minimum 8 Characters Long"],
		maxLength: [
			20,
			"Please Enter a Password That is Maximum 20 Characters Long",
		],
	},
	department: {
		type: String,
		required: true,
	},

	role: {
		type: String,
		default: "employee",
	},
});
//hashing password before saving or creating an employee
employeeSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		console.log(this.password);
		return next();
	}
	this.password = await bcrypt.hash(this.password, 10);
	console.log(this.password);
});
//matching password befor the employee logins
employeeSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

//generating jwt token for user
employeeSchema.methods.getJwtToken = function () {
	return jwt.sign({ id: this._id }, "njuebuipoqdjbcibwjcnowdopq", {
		expiresIn: "3d",
	});
};

module.exports = mongoose.model("Employee", employeeSchema);
