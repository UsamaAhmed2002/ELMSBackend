const mongoose = require("mongoose");

const connectDataBase = () => {
	mongoose
		.connect("mongodb://localhost:27017/ELMS", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log("Connected to database Successfully"))
		.catch((e) => console.log(e));
};
module.exports = connectDataBase;
