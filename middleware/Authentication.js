const jwt = require("jsonwebtoken");
const employeeModels = require("../models/employeeModels");

exports.isAuthenticated = async (req, res, next) => {
	try {
		const { token } = req.cookies;
		if (!token)
			return res
				.status(400)
				.json({ success: false, error: "Please Login First" });
		const decodedData = jwt.verify(token, "njuebuipoqdjbcibwjcnowdopq");
		req.employee = await employeeModels.findById(decodedData.id);
		next();
	} catch (e) {
		res.status(500).json({
			success: false,
			error: e.message,
		});
	}
};

exports.AuthorizeRoles = (...role) => {
	return (req, res, next) => {
		if (!role.includes(req.employee.role)) {
			return res.status(400).json({
				success: false,
				error: "Only Admin is Allowed to Access this route",
			});
		}
		next();
	};
};
