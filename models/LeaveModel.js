const mongoose = require("mongoose");

//creating new model
const leaveSchema = new mongoose.Schema({
	reason: {
		type: String,
		required: true,
		minLength: [50, "Reason Should be Minimum 50 Characters"],
		maxLength: [
			600,
			"Maximum Length Of Reason is 600 Please make give a Shorter Reason",
		],
	},
	employee: {
		type: mongoose.Schema.ObjectId,
		ref: "Employee",
		required: true,
	},
	noOfDays: {
		type: Number,
		required: true,
		max: 7,
	},
	typeOfLeave: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		default: "Processing",
	},
});
module.exports = mongoose.model("Leave", leaveSchema);
